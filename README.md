# 🌿 Zen-Save: Tu Santuario Financiero Web3

**Zen-Save es un terapeuta financiero impulsado por IA en la red Rootstock que transforma tus gastos impulsivos en hábitos de ahorro automatizados (DCA).**

## 🚨 El Problema
Las finanzas descentralizadas (DeFi) suelen ser frías y tienen una curva de aprendizaje alta. Por otro lado, los gastos impulsivos del día a día merman nuestra capacidad de construir patrimonio. ¿Cómo unimos la psicología conductual con Web3 sin fricción para el usuario final?

## 💡 La Solución
Zen-Save es una dApp *mobile-first* donde los usuarios confiesan sus gastos diarios a "Zen" (nuestro Oráculo de IA). En lugar de solo categorizar el gasto, Zen analiza la emoción detrás de la compra y propone un **Reto de Ahorro (DCA)**. Con un solo clic, el usuario acepta el reto, y nuestro Smart Contract en Rootstock bloquea fondos en DoC para invertirlos gradualmente en Smart Bitcoin (RBTC).

## ✨ Características Principales
* **🧠 Intervención IA:** Análisis de sentimiento y propuestas de ahorro hiper-personalizadas usando procesamiento de lenguaje natural.
* **🔐 Cero Fricción con Beexo:** Integración nativa con `xo-connect` (EIP-1193) para un onboarding seguro y sin frases semilla.
* **🏦 Bóvedas Inteligentes (RSK):** Smart Contracts desplegados en Rootstock Testnet que gestionan y ejecutan la estrategia *Dollar Cost Averaging*.
* **📈 Mercado del Santuario:** Dashboard en tiempo real con los valores clave del ecosistema Rootstock (RBTC, RIF, DoC).

## 🛠️ Stack Tecnológico
* **Frontend:** React, Vite, CSS nativo (UX/UI de alto contraste), `ethers.js`, `xo-connect` SDK.
* **Backend:** Python, Flask, SQLite (memoria transaccional), API de Modelos Generativos.
* **Blockchain:** Solidity, Rootstock (RSK) Testnet.

## 🚀 Alineación con los Tracks
Hemos construido una experiencia que cumple los requisitos técnicos (uso de Beexo Wallet para login y firmas, transacciones on-chain en Rootstock) mientras entregamos un producto con un diseño de nivel productivo. Demostramos que DeFi puede ser empático, fácil de usar y enfocado en el bienestar de la comunidad.

##COMO EJECTUTAR LA APP:

git clone https://github.com/Alediaz04/ZENSAVE-MAIN.git

cd ZENSAVE-MAIN

GitHub:
GitHub - Alediaz04/ZENSAVE-MAIN

Navegar a la carpeta del backend

cd backend

Crear un entorno virtual (Recomendado)

python -m venv venv

Activar el entorno virtual

En Windows (Git Bash): source venv/Scripts/activate
En Windows (CMD): .\venv\Scripts\activate
En Mac/Linux: source venv/bin/activate
Instalar las dependencias necesarias
pip install Flask flask-cors google-generativeai python-dotenv

¡IMPORTANTE! Crear el archivo de variables de entorno

Crea un archivo llamado .env en la carpeta /backend y añade tu API Key:
GEMINI_API_KEY="tu_clave_aqui"
Iniciar el servidor (correrá en http://127.0.0.1:5000/)
python app.py
-------------------
Navegar a la carpeta del frontend
cd frontend

Instalar todas las dependencias base del proyecto
npm install

Asegurar la instalación de las librerías Web3 (Rootstock/Beexo)
npm install ethers xo-connect

Iniciar el entorno de desarrollo
npm run dev