"""
Sentiment Analysis Module for DRDO Interview System
Analyzes candidate responses during interviews for sentiment, confidence, and engagement
"""

import re
import numpy as np
import pandas as pd
from textblob import TextBlob
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
import requests
import json
from datetime import datetime
import logging

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.confidence_keywords = {
            'high': ['confident', 'sure', 'certain', 'definitely', 'absolutely', 'clearly', 'obviously'],
            'medium': ['think', 'believe', 'probably', 'likely', 'seems', 'appears'],
            'low': ['maybe', 'perhaps', 'uncertain', 'not sure', 'might', 'possibly', 'confused']
        }
        self.technical_keywords = [
            'algorithm', 'data structure', 'programming', 'software', 'development',
            'database', 'system', 'design', 'architecture', 'testing', 'debugging',
            'framework', 'library', 'api', 'security', 'performance', 'optimization'
        ]
    
    def preprocess_text(self, text):
        """Clean and preprocess text for analysis"""
        if not text or not isinstance(text, str):
            return ""
        
        # Convert to lowercase and remove special characters
        text = re.sub(r'[^a-zA-Z\s]', '', text.lower())
        
        # Tokenize and remove stop words
        tokens = word_tokenize(text)
        tokens = [token for token in tokens if token not in self.stop_words and len(token) > 2]
        
        return ' '.join(tokens)
    
    def analyze_sentiment(self, text):
        """Analyze sentiment using TextBlob"""
        try:
            blob = TextBlob(text)
            polarity = blob.sentiment.polarity  # -1 to 1
            subjectivity = blob.sentiment.subjectivity  # 0 to 1
            
            # Convert polarity to sentiment label
            if polarity > 0.1:
                sentiment_label = 'positive'
            elif polarity < -0.1:
                sentiment_label = 'negative'
            else:
                sentiment_label = 'neutral'
            
            return {
                'sentiment': sentiment_label,
                'polarity': round(polarity, 3),
                'subjectivity': round(subjectivity, 3),
                'confidence': abs(polarity)  # How confident we are in the sentiment
            }
        except Exception as e:
            logger.error(f"Error in sentiment analysis: {e}")
            return {
                'sentiment': 'neutral',
                'polarity': 0.0,
                'subjectivity': 0.0,
                'confidence': 0.0
            }
    
    def analyze_confidence_level(self, text):
        """Analyze confidence level based on word choice"""
        try:
            text_lower = text.lower()
            
            high_confidence_count = sum(1 for word in self.confidence_keywords['high'] if word in text_lower)
            medium_confidence_count = sum(1 for word in self.confidence_keywords['medium'] if word in text_lower)
            low_confidence_count = sum(1 for word in self.confidence_keywords['low'] if word in text_lower)
            
            total_words = len(word_tokenize(text))
            
            if total_words == 0:
                return {'confidence_level': 'medium', 'confidence_score': 50}
            
            # Calculate confidence score (0-100)
            confidence_score = (
                (high_confidence_count * 3 + medium_confidence_count * 2 + low_confidence_count * (-1)) 
                / total_words * 100
            )
            
            # Normalize to 0-100 range
            confidence_score = max(0, min(100, confidence_score + 50))
            
            # Determine confidence level
            if confidence_score > 70:
                confidence_level = 'high'
            elif confidence_score > 40:
                confidence_level = 'medium'
            else:
                confidence_level = 'low'
            
            return {
                'confidence_level': confidence_level,
                'confidence_score': round(confidence_score, 2)
            }
        except Exception as e:
            logger.error(f"Error in confidence analysis: {e}")
            return {'confidence_level': 'medium', 'confidence_score': 50}
    
    def analyze_technical_content(self, text):
        """Analyze technical content relevance"""
        try:
            text_lower = text.lower()
            technical_word_count = sum(1 for word in self.technical_keywords if word in text_lower)
            total_words = len(word_tokenize(text))
            
            if total_words == 0:
                return {'technical_score': 0, 'technical_density': 0}
            
            technical_density = (technical_word_count / total_words) * 100
            technical_score = min(100, technical_density * 10)  # Scale to 0-100
            
            return {
                'technical_score': round(technical_score, 2),
                'technical_density': round(technical_density, 2),
                'technical_words_found': technical_word_count
            }
        except Exception as e:
            logger.error(f"Error in technical analysis: {e}")
            return {'technical_score': 0, 'technical_density': 0, 'technical_words_found': 0}
    
    def analyze_response_quality(self, text, question=""):
        """Analyze overall response quality"""
        try:
            # Basic metrics
            word_count = len(word_tokenize(text))
            sentence_count = len(sent_tokenize(text))
            avg_sentence_length = word_count / sentence_count if sentence_count > 0 else 0
            
            # Complexity analysis (vocabulary diversity)
            unique_words = len(set(word_tokenize(text.lower())))
            vocabulary_diversity = unique_words / word_count if word_count > 0 else 0
            
            # Calculate quality score
            length_score = min(100, (word_count / 50) * 100)  # Optimal around 50 words
            structure_score = min(100, sentence_count * 20)  # Multiple sentences preferred
            diversity_score = vocabulary_diversity * 100
            
            overall_quality = (length_score + structure_score + diversity_score) / 3
            
            return {
                'word_count': word_count,
                'sentence_count': sentence_count,
                'avg_sentence_length': round(avg_sentence_length, 2),
                'vocabulary_diversity': round(vocabulary_diversity, 3),
                'quality_score': round(overall_quality, 2)
            }
        except Exception as e:
            logger.error(f"Error in quality analysis: {e}")
            return {
                'word_count': 0,
                'sentence_count': 0,
                'avg_sentence_length': 0,
                'vocabulary_diversity': 0,
                'quality_score': 0
            }
    
    def comprehensive_analysis(self, text, question="", context=None):
        """Perform comprehensive analysis of interview response"""
        try:
            if not text or not isinstance(text, str):
                return self._get_empty_analysis()
            
            # Preprocess text
            cleaned_text = self.preprocess_text(text)
            
            # Perform all analyses
            sentiment_result = self.analyze_sentiment(text)
            confidence_result = self.analyze_confidence_level(text)
            technical_result = self.analyze_technical_content(text)
            quality_result = self.analyze_response_quality(text, question)
            
            # Calculate overall score
            overall_score = (
                sentiment_result['confidence'] * 20 +  # Sentiment confidence
                confidence_result['confidence_score'] * 0.3 +  # Confidence level
                technical_result['technical_score'] * 0.25 +  # Technical relevance
                quality_result['quality_score'] * 0.25  # Response quality
            )
            
            return {
                'timestamp': datetime.now().isoformat(),
                'original_text': text,
                'cleaned_text': cleaned_text,
                'sentiment': sentiment_result,
                'confidence': confidence_result,
                'technical': technical_result,
                'quality': quality_result,
                'overall_score': round(overall_score, 2),
                'recommendation': self._get_recommendation(overall_score),
                'analysis_metadata': {
                    'text_length': len(text),
                    'question': question,
                    'context': context
                }
            }
        except Exception as e:
            logger.error(f"Error in comprehensive analysis: {e}")
            return self._get_empty_analysis()
    
    def _get_recommendation(self, score):
        """Get recommendation based on overall score"""
        if score >= 80:
            return 'excellent'
        elif score >= 60:
            return 'good'
        elif score >= 40:
            return 'average'
        else:
            return 'needs_improvement'
    
    def _get_empty_analysis(self):
        """Return empty analysis structure"""
        return {
            'timestamp': datetime.now().isoformat(),
            'original_text': '',
            'cleaned_text': '',
            'sentiment': {'sentiment': 'neutral', 'polarity': 0, 'subjectivity': 0, 'confidence': 0},
            'confidence': {'confidence_level': 'medium', 'confidence_score': 50},
            'technical': {'technical_score': 0, 'technical_density': 0, 'technical_words_found': 0},
            'quality': {'word_count': 0, 'sentence_count': 0, 'avg_sentence_length': 0, 'vocabulary_diversity': 0, 'quality_score': 0},
            'overall_score': 0,
            'recommendation': 'needs_improvement',
            'analysis_metadata': {'text_length': 0, 'question': '', 'context': None}
        }

def analyze_interview_responses(responses_data):
    """
    Analyze multiple interview responses
    responses_data: list of dictionaries with 'question' and 'answer' keys
    """
    analyzer = SentimentAnalyzer()
    results = []
    
    for i, response in enumerate(responses_data):
        question = response.get('question', '')
        answer = response.get('answer', '')
        
        analysis = analyzer.comprehensive_analysis(answer, question)
        analysis['response_index'] = i
        results.append(analysis)
    
    # Calculate summary statistics
    if results:
        overall_scores = [r['overall_score'] for r in results]
        summary = {
            'total_responses': len(results),
            'average_score': round(np.mean(overall_scores), 2),
            'highest_score': round(np.max(overall_scores), 2),
            'lowest_score': round(np.min(overall_scores), 2),
            'score_variance': round(np.var(overall_scores), 2),
            'overall_recommendation': analyzer._get_recommendation(np.mean(overall_scores))
        }
    else:
        summary = {
            'total_responses': 0,
            'average_score': 0,
            'highest_score': 0,
            'lowest_score': 0,
            'score_variance': 0,
            'overall_recommendation': 'needs_improvement'
        }
    
    return {
        'individual_analyses': results,
        'summary': summary,
        'analysis_timestamp': datetime.now().isoformat()
    }

# Example usage and testing
if __name__ == "__main__":
    # Test the sentiment analyzer
    analyzer = SentimentAnalyzer()
    
    test_responses = [
        {
            'question': 'Tell me about your experience with Python programming.',
            'answer': 'I am very confident in my Python skills. I have worked with various frameworks like Django and Flask for web development. I enjoy solving complex algorithms and have experience with data structures.'
        },
        {
            'question': 'How do you handle pressure in the workplace?',
            'answer': 'Well, I think I handle pressure reasonably well. I try to stay calm and maybe prioritize tasks, though sometimes I might feel a bit uncertain about the best approach.'
        }
    ]
    
    results = analyze_interview_responses(test_responses)
    print(json.dumps(results, indent=2))