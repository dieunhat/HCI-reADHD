from transformers import pipeline
from huggingface_hub import InferenceClient
import logging

SUMMARIZER = pipeline(task="summarization",
                      model="google/long-t5-tglobal-base",
                      tokenizer="google/long-t5-tglobal-base",
                      max_length=128, min_length=10)

INFER_CLIENT = InferenceClient()


def summarize(input_text):
    logging.log(logging.INFO, 'Summarizing...')
    logging.log(logging.INFO, 'Input text:', input_text)
    summary = SUMMARIZER(input_text)[0]['summary_text']
    logging.log(logging.INFO, 'Summary:', summary)
    return summary


def temp_summarize(input_text):
    print('Summarizing...')
    print('Input text:', input_text)
    summary = SUMMARIZER(input_text)[0]['summary_text']
    print('Summary:', summary)
    return {'summary': summary}
