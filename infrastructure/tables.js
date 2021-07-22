class Tables {
    init(connection) {
        this.connection = connection

        this.createVideos()
    }

    createVideos() {
        const urlRegex = new RegExp("[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)", "g")

        const sql = `CREATE TABLE IF NOT EXISTS Videos (id INT NOT NULL AUTO INCREMENT, titulo VARCHAR(70) NOT NULL, descricao TEXT VARCHAR(3000) NOT NULL, url REGEX ${urlRegex})`

        this.connection.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela de videos criada com sucesso")
            }
        })
    }
}

module.exports = Tables
