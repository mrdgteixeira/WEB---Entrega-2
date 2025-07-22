"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    console.log('🗑️ Limpando dados existentes...');
    await prisma.transaction.deleteMany();
    await prisma.category.deleteMany();
    await prisma.bank.deleteMany();
    console.log('✅ Dados limpos! Criando novos dados...');
    const bank1 = await prisma.bank.create({
        data: {
            ispb: '00000000',
            name: 'Banco do Brasil',
            code: '001',
            fullName: 'Banco do Brasil S.A.'
        }
    });
    const bank2 = await prisma.bank.create({
        data: {
            ispb: '60701190',
            name: 'Itaú',
            code: '341',
            fullName: 'Itaú Unibanco S.A.'
        }
    });
    const bank3 = await prisma.bank.create({
        data: {
            ispb: '18236120',
            name: 'Nubank',
            code: '260',
            fullName: 'Nu Pagamentos S.A.'
        }
    });
    const category1 = await prisma.category.create({
        data: {
            name: 'Alimentação',
            icon: '🍕'
        }
    });
    const category2 = await prisma.category.create({
        data: {
            name: 'Transporte',
            icon: '🚗'
        }
    });
    const category3 = await prisma.category.create({
        data: {
            name: 'Lazer',
            icon: '🎬'
        }
    });
    const category4 = await prisma.category.create({
        data: {
            name: 'Saúde',
            icon: '🏥'
        }
    });
    await prisma.transaction.create({
        data: {
            description: 'Almoço no restaurante',
            amount: -50.99,
            type: 'expense',
            date: new Date(),
            categoryId: category1.id,
            bankId: bank1.id
        }
    });
    await prisma.transaction.create({
        data: {
            description: 'Uber para o trabalho',
            amount: -25.50,
            type: 'expense',
            date: new Date(),
            categoryId: category2.id,
            bankId: bank2.id
        }
    });
    await prisma.transaction.create({
        data: {
            description: 'Salário',
            amount: 3500.00,
            type: 'income',
            date: new Date(),
            categoryId: null,
            bankId: bank3.id
        }
    });
    await prisma.transaction.create({
        data: {
            description: 'Cinema com amigos',
            amount: -45.00,
            type: 'expense',
            date: new Date(),
            categoryId: category3.id,
            bankId: bank3.id
        }
    });
    console.log('✅ Dados de exemplo criados com sucesso!');
    console.log(`📊 Bancos criados: ${[bank1.name, bank2.name, bank3.name].join(', ')}`);
    console.log(`📁 Categorias criadas: ${[category1.name, category2.name, category3.name, category4.name].join(', ')}`);
    console.log('💰 4 transações de exemplo criadas');
}
main()
    .catch((e) => {
    console.error('❌ Erro ao criar dados:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
