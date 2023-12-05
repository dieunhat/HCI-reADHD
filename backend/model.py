from transformers import pipeline
from huggingface_hub import InferenceClient
import logging

SUMMARIZER = pipeline(task="summarization",
                      model="google/long-t5-tglobal-base",
                      tokenizer="google/long-t5-tglobal-base")

INFER_CLIENT = InferenceClient()


def summarize(input_text):
    logging.log(logging.INFO, 'Summarizing...')
    logging.log(logging.INFO, 'Input text:', input_text)
    summary_len = int(len(input_text.split(' ')) / 2)
    summary = SUMMARIZER(input_text, max_new_tokens=summary_len)[0]['summary_text']
    logging.log(logging.INFO, 'Summary:', summary)
    return summary