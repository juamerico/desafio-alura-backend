const Tables = [
    require("./tables/categoryTable"),
    require("./tables/videoTable"),
    require("./tables/userTable")
]

async function createTables() {
    for(let i = 0; i < Tables.length; i++) {
        const table = Tables[i]
        await table.sync()
    }
}

createTables()
