from fastapi import FastAPI, UploadFile, File
import pytesseract
from PIL import Image
import torch
import easyocr
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

import tempfile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.mount("/", StaticFiles(directory="static", html=True), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Setup device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def extract_text_from_image(image, lang="ne"):
    reader = easyocr.Reader([lang], verbose=False)
    results = reader.readtext(image)
    text = " ".join([res[1] for res in results])
    return text.strip()


def translate_ne_to_en(nepali_text, model_name="iamTangsang/MarianMT-Nepali-to-English"):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)

    inputs = tokenizer(
        nepali_text,
        return_tensors="pt",
        padding=True,
        truncation=True,
        max_length=512
    ).to(device)

    translated_tokens = model.generate(
        **inputs,
        num_beams=6,
        length_penalty=1.0,
        max_length=200,
        early_stopping=True,
        no_repeat_ngram_size=2
    )

    english_text = tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
    return english_text.strip()


@app.post("/process-image/")
async def process_image(file: UploadFile = File(...), lang: str = "ne"):
    # Save uploaded image temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Step 1: Extract text
    nepali_text = extract_text_from_image(tmp_path, lang=lang)

    # Step 2: Translate
    english_text = translate_ne_to_en(nepali_text)

    return {
        "original_text": nepali_text,
        "translated_text": english_text
    }
