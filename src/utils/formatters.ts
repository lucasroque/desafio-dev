export const formatCurrency = (amount: string): string => {
    amount = "R$ " + amount.replace(/(\d)(?=(\d{3})+(\,(\d){0,2})*$)/g, '$1.');

    if (amount.indexOf(',') === -1)
        return amount + ',00';

    var decimals = amount.split(',')[1];

    return decimals.length < 2 ? amount + '0' : amount;
};

export const formatDate = (date: string): string => {
    return date.replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1");
}

export const formatTime = (time: string): string => {
    return time.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
}

export const formatTransacrionType = (type: string): { description: string, nature: string} => {
    const transactionTypes: Record<string, { description: string, nature: string}> = {
        1: { description: "Débito", nature: "+"},
        2: { description: "Boleto", nature: "-"},
        3: { description: "Financiamento", nature: "-"},
        4: { description: "Crédito", nature: "+"},
        5: { description: "Recebimento Empréstimo", nature: "+"},
        6: { description: "Vendas", nature: "+"},
        7: { description: "Recebimento TED", nature: "+"},
        8: { description: "Recebimento DOC", nature: "+"},
        9: { description: "Aluguel", nature: "-"}
    };

    return transactionTypes[type] || { description: "Tipo desconhecido", nature: ""};
}
