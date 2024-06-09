const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
    const bodyLower = message.body.toLowerCase();
    if (bodyLower === 'ola' || bodyLower === 'oi' || bodyLower === 'bom' || bodyLower === 'boa') {
        client.sendMessage(message.from, 'Seja bem-vindo.');
        client.sendMessage(message.from, 'Deseja um orçamento? Escolha para qual serviço:');
        client.sendMessage(message.from, '1. Sites dos mais diversos, desde simples a web sistemas');
        client.sendMessage(message.from, '2. Programas ou sistemas, específicos para uma necessidade');
        client.sendMessage(message.from, '3. Bots ou automações');
    } else if (bodyLower === '1') {
        client.sendMessage(message.from, 'Descreva com máximo de detalhes como deseja que seja seu site e seu funcionamento.');
    } else if (bodyLower === '2') {
        client.sendMessage(message.from, 'Descreva com máximo de detalhes como deseja que seja seu sistema e seu funcionamento.');
    } else if (bodyLower === '3' || bodyLower === 'site' || bodyLower === 'bot' || bodyLower === 'sistema' || bodyLower === 'automaçao' || bodyLower === 'web' || bodyLower === 'automatizar' || bodyLower === 'programa') {
        client.sendMessage(message.from, 'Obrigado pelo contato, retornaremos em breve, se possível deixe email para contato.');
    }
});


client.initialize();


