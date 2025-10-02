from flask import Flask, request, jsonify
import os
import tempfile
import warnings
import torch
import easyocr
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, MarianMTModel, MarianTokenizer

warnings.filterwarnings("ignore", message=".pin_memory.")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def extract_text_from_image(image_path, lang="ne"):
    reader = easyocr.Reader([lang], gpu=(device.type == "cuda"), verbose=False)
    results = reader.readtext(image_path)
    text = " ".join([res[1] for res in results])
    return text.strip()

def translate_ne_to_en(nepali_text, model_name="iamTangsang/MarianMT-Nepali-to-English"):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)
    inputs = tokenizer(nepali_text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)
    translated_tokens = model.generate(**inputs, num_beams=6, length_penalty=1.0, max_length=200, early_stopping=True, no_repeat_ngram_size=2)
    english_text = tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
    return english_text.strip()

def translate_en_to_hi(english_text, model_name="Helsinki-NLP/opus-mt-en-hi"):
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name).to(device)
    inputs = tokenizer(english_text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)
    translated_tokens = model.generate(**inputs, num_beams=6, length_penalty=1.0, max_length=200, early_stopping=True, no_repeat_ngram_size=2)
    hindi_text = tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
    return hindi_text.strip()


app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    fd, path = tempfile.mkstemp(suffix='.jpg')
    file.save(path)

    try:
        nepali_text = extract_text_from_image(path)
        if nepali_text:
            english_text = translate_ne_to_en(nepali_text)
            hindi_text = translate_en_to_hi(english_text)
        else:
            english_text = ""
            hindi_text = ""
        return jsonify({
            'nepali_text': nepali_text,
            'english_text': english_text,
            'hindi_text': hindi_text
        })
    finally:
        os.remove(path)

if __name__ == '__main__':
    app.run(debug=True)