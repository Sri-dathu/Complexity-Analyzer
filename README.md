# Complexity-Analyzer


# 🧠 Complexity-Analyzer

**Code2Complexity** is a web-based tool that analyzes the time and space complexity of code. Designed for educational and personal use, it helps users understand algorithmic performance through symbolic derivation and visual explanation.

## 🚀 Features

- ✍️ Accepts code via editor or image upload (OCR-powered)
- 🔍 Parses loops, recursion, and control flow to derive cost equations
- 📐 Solves summations and recurrence relations using symbolic math
- 📊 Explains Big-O, Big-Θ, and Big-Ω complexity with assumptions
- 🌳 Visualizes AST, recursion trees, and control structures
- 🧩 Modular AI agents for code analysis and explanation

## 🛠️ Tech Stack

- **Frontend**: React, HTML/CSS, JavaScript
- **Backend**: Python (FastAPI), SymPy, OCR (Tesseract)
- **Tools**: Anaconda, RStudio (for dashboard prototyping), GitHub Actions

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/Complexity-Analyzer.git
cd code2complexity

# Set up backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Set up frontend
cd ../frontend
npm install
npm start

