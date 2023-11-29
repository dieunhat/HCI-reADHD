# importing required modules
from PyPDF2 import PdfReader
import docx2txt


def read_pdf(file) -> dict:
    # creating a pdf reader object
    reader = PdfReader(file)

    num_pages = len(reader.pages)

    # pages = []
    # for i in range(num_pages):
    #     pages.append(reader.pages[i].extract_text())
    texts = []
    for i in range(num_pages):
        texts.append(reader.pages[i].extract_text())


    # return {'title': title, 'num_pages': num_pages, 'pages': pages}
    return texts


def read_txt(file) -> dict:
    print(file)
    data = file.read()
    data = data.decode("utf-8")
    print(data)

    return [data]


def read_docx(file) -> dict:
    data = docx2txt.process(file)

    return [data]

def read_text(text) -> dict:
    # text = text.decode("utf-8")
    print(text)
    return [text]
