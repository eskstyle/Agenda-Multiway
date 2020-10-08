// verifica se o token está expirado, comparando o timestamp atual com o que ele foi gerado.
export const verificaToken = (expiresIn) => {
    if (Math.round(Date.now() / 1000) > expiresIn) {
        return true;
    } else {
        return false;
    }
};

