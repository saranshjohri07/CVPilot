import fitz  # PyMuPDF
import re
import os

def extract_text_from_pdf(filepath: str) -> str:
    """
    Extract clean text from a PDF file.
    
    Args:
        filepath: path to the PDF file
        
    Returns:
        Clean text string from all pages
    """
    try:
        # Open the PDF file
        doc = fitz.open(filepath)
        
        full_text = ""
        
        # Loop through every page
        for page_num in range(len(doc)):
            page = doc[page_num]
            
            # Extract text from this page
            page_text = page.get_text()
            full_text += page_text + "\n"
        
        # Close the document
        doc.close()
        
        # Clean the extracted text
        clean_text = clean_resume_text(full_text)
        
        return clean_text
        
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""


def clean_resume_text(text: str) -> str:
    """
    Clean and normalize resume text for NLP processing.
    
    Args:
        text: raw text from PDF
        
    Returns:
        Cleaned, normalized text string
    """
    # Convert to lowercase
    text = text.lower()
    
    # Replace newlines with spaces
    text = text.replace('\n', ' ')
    text = text.replace('\t', ' ')
    
    # Remove special characters but keep letters, numbers, spaces
    # Keep @ for email detection
    text = re.sub(r'[^\w\s@]', ' ', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text


def get_text_preview(text: str, max_chars: int = 200) -> str:
    """
    Get a short preview of the resume text.
    Used to confirm extraction worked.
    
    Args:
        text: full resume text
        max_chars: how many characters to return
        
    Returns:
        First max_chars characters of text
    """
    if len(text) <= max_chars:
        return text
    return text[:max_chars] + "..."