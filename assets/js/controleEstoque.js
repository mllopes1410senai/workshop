const estoque = {
    produtos: [],
    produtoEditando: 0,

    armazenarObjeto(){
        var objeto = localStorage.getItem('produtos')
        objeto = JSON.parse(objeto)
        this.produtos = objeto

        this.exibirCadastros()
    },

    cadastrarProduto(){
        var nome = document.querySelector('#nome').value
        var preco = document.querySelector('#preco').value
        var qtdEstoque = document.querySelector('#qtdEstoque').value

        this.produtos.push({
            nome: nome,
            preco: preco,
            qtdEstoque: qtdEstoque
        })

        document.querySelector('#nome').value = ""
        document.querySelector('#preco').value = ""
        document.querySelector('#qtdEstoque').value = ""

        alert("Produto Cadastrado")

        this.exibirCadastros()
    },

    exibirCadastros() {
        localStorage.setItem("produtos", JSON.stringify(this.produtos))
        var tabela = document.querySelector("#tabela")

        tabela.innerHTML = `
            <tr>     
                <th>Nome</th>
                <th>Preço (R$)</th>
                <th>Quantidade</th> 
                <th>Alterações</th>    
            </tr>
        `

        var pos = 0

        for (var produto of this.produtos) {
            tabela.innerHTML += `
                <tr> 
                    <td>`+ produto.nome +`</td>
                    <td>`+ produto.preco +`</td>
                    <td>`+ produto.qtdEstoque +`</td>
                    <td>
                        <button class="editar" data-pos="`+ pos +`">Editar</button>
                        <button class="excluir" data-pos="`+ pos +`">Excluir</button>
                    </td>
                </tr>
            `

            pos = pos + 1
        }

        document.querySelector('#cadastrar').style.display = 'none'

        document.querySelector(".excluir").addEventListener("click", function(event) {
            var pos = event.target.getAttribute("data-pos")

            estoque.deletarProduto(pos)
        })

        document.querySelector(".editar").addEventListener("click", function(event) {
            var pos = event.target.getAttribute("data-pos")
            document.querySelector("#posicao").value = pos

            estoque.abrirEditor(pos)
        })

        this.calcularResultados()
    },

    deletarProduto(posicao){
        this.produtos.splice(posicao, 1)
        this.exibirCadastros()
    },


    abrirEditor(posicao){
        var produto = this.produtos[posicao]

        console.log(posicao, produto)

        document.querySelector('#editor').style.display = 'block'

        document.querySelector("#nome2").value = produto.nome
        document.querySelector("#preco2").value = produto.preco
        document.querySelector("#qtdEstoque2").value = produto.qtdEstoque
    },

    editarProduto(){
        var posicao = document.querySelector('#posicao').value
        var nomeEditar = document.querySelector('#nome2').value
        var precoEditar = document.querySelector('#preco2').value
        var qtdEstoqueEditar = document.querySelector('#qtdEstoque2').value

        this.produtos[posicao].nome = nomeEditar
        this.produtos[posicao].preco = precoEditar
        this.produtos[posicao].qtdEstoque = qtdEstoqueEditar

        this.exibirCadastros()

        document.querySelector('#editor').style.display = 'none'
    },

    calcularResultados(){
        var soma = 0
        var menor = Infinity
        for (var produto of this.produtos){
            soma += Number(produto.qtdEstoque)
            if(produto.qtdEstoque < menor){
                menor = produto.nome
            }
        }

        document.querySelector('#total').innerHTML = 'A soma dos produtos em estoque é: ' + soma
        document.querySelector('#menor').innerHTML = 'O produto com menor estoque é: ' + menor
    }
}

function abrirCadastro(){
    document.querySelector('#cadastrar').style.display = 'block'
}

estoque.armazenarObjeto()
