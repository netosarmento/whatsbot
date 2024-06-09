const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-gpu', ],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is Ready!');
});

client.on('message', message => {
    const bodyLower = message.body.toLowerCase();
    if (bodyLower === 'ola' || bodyLower === 'oi' || bodyLower === 'bom' || bodyLower === 'boa tarde' || bodyLower === 'bom dia' || bodyLower === 'boa noite' || bodyLower === 'fala' || bodyLower === '.' || bodyLower === 'boa') 
        {
        client.sendMessage(message.from, 'Seja bem-vindo.');
        client.sendMessage(message.from, 'Deseja um orçamento? Escolha para qual serviço:');
        client.sendMessage(message.from, '1. Sites dos mais diversos, desde simples a web sistemas');
        client.sendMessage(message.from, '2. Programas ou sistemas, específicos para uma necessidade');
        client.sendMessage(message.from, '3. Bots ou automações');
    } else if (bodyLower === '1') {
        client.sendMessage(message.from, 'Descreva com máximo de detalhes como deseja que seja seu site e seu funcionamento.');
    } else if (bodyLower === '2') {
        client.sendMessage(message.from, 'Descreva com máximo de detalhes como deseja que seja seu sistema e seu funcionamento.');
    } else if (bodyLower === '3') {
        client.sendMessage(message.from, 'Descreva com máximo de detalhes como deseja no seu bot ou automação.');
    }
});

client.initialize();

