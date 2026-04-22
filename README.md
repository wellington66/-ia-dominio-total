# 🚀 IA Domínio Total — Infoproduto Completo

Site de alta conversão + ebook + 5 bônus + 2.000 prompts prontos.
Infoproduto low-ticket (R$ 17,90) com empilhamento de oferta e funil estratégico.

## 📂 Estrutura

```
infoproduto-ia/
├── index.html                       # Landing page de alta conversão (mobile-first)
├── obrigado.html                    # Thank you page + upsell + entrega
├── assets/
│   ├── css/style.css                # Design system dark
│   └── js/main.js                   # Timer, pixels, CTAs, tracking
└── produto/
    ├── ebook.html                   # Ebook principal (12 capítulos)
    ├── bonus-ugc.html               # Bônus #2 — Criativos UGC com IA
    ├── bonus-renda-extra.html       # Bônus #3 — 10 projetos de renda extra
    ├── bonus-nano-sora-eleven.html  # Bônus #4/#5 — Nano Banana, Sora, ElevenLabs
    ├── 2000-prompts.html            # Pack 2.000 prompts (20 categorias, com busca e cópia)
    └── _generate-prompts.js         # Script gerador dos prompts (opcional)
```

## ⚡ Como testar localmente

Abra `index.html` no navegador ou rode um servidor local:

```bash
cd infoproduto-ia
npx serve .
# ou
python -m http.server 8000
```

## 🎯 Antes de subir para produção — checklist

### 1. Configurar pixels

Em `assets/js/main.js`, substitua:

```js
META_PIXEL_ID: 'SEU_META_PIXEL_AQUI'
TIKTOK_PIXEL_ID: 'SEU_TIKTOK_PIXEL_AQUI'
GA4_ID: 'G-SEU_GA4_AQUI'
CHECKOUT_URL: 'https://pay.kiwify.com.br/SEUCODIGO'  // cole o seu checkout aqui
```

Em `index.html` e `obrigado.html`, **descomente** os blocos de script dos pixels:

```html
<!-- <script>fbq('init', 'SEU_META_PIXEL_AQUI'); ...</script> -->
```
→ vire
```html
<script>fbq('init', '123456789'); ...</script>
```

### 2. Trocar domínio e CTA de checkout

Procure por `#` em todos os CTAs e substitua pelo link real do checkout (Kiwify, Hotmart, Eduzz, Pepper, etc).

### 3. Ajustar metadados SEO

- `<title>` — já otimizado
- `<meta name="description">` — revisar
- Open Graph — adicionar imagem de preview (`og:image`)
- Favicon — adicionar

## 🌐 Hospedagem recomendada

### Opção A — GitHub Pages (grátis, rápido)

```bash
cd infoproduto-ia
git init
git add .
git commit -m "feat: infoproduto IA Domínio Total completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ia-dominio-total.git
git push -u origin main
```

No repositório GitHub → Settings → Pages → branch `main` → pasta `/` → Save.
Seu site estará em `https://SEU_USUARIO.github.io/ia-dominio-total/`.

### Opção B — Vercel (domínio custom fácil)

```bash
npm i -g vercel
vercel
```

### Opção C — Netlify

Arraste a pasta inteira em netlify.com/drop.

## 🔗 Conectando domínio próprio

Compre domínio em Registro.br / Hostgator / Hostinger. Aponte o CNAME/A para o host escolhido.
Exemplo Vercel: adicione o domínio em Settings → Domains.

## 💳 Plataforma de checkout sugerida

- **Kiwify** — taxa 9,99% + R$ 1,99, pixel nativo, liberação automática.
- **Hotmart** — taxa 9,9% + R$ 1, afiliação pronta.
- **Eduzz** — taxa 7,99% + R$ 2, bom para lives.
- **Pepper** — taxa 4,99%, one-click upsell.

Em qualquer uma: crie o produto (preço R$ 17,90), habilite pixel Meta/TikTok, configure entrega por e-mail apontando para `obrigado.html`.

## 📊 Funil pensado

1. **Tráfego pago** (Meta Ads / TikTok Ads) → `index.html`
2. **Landing** → CTA leva ao checkout da plataforma
3. **Checkout** → compra confirmada
4. **Pós-compra** → redirect para `obrigado.html` (dispara evento Purchase)
5. **Obrigado page** → upsell Pro+ (R$ 47) + entrega dos acessos
6. **E-mail** → sequência de onboarding e nurturing (ver bônus de e-mail nos prompts)

## 📈 Copy de anúncios sugeridos

Ver `produto/2000-prompts.html` → categoria "Tráfego Pago". Lá tem prompts prontos para gerar anúncios no Meta e TikTok alinhados com a landing.

---

© 2026 — IA Domínio Total
