import com.github.britooo.looca.api.core.Looca
import java.util.*

fun sistema(bd:Repositorio, looca: Looca, ip:String){

    val sistema = Sistema()
    val captura = CPU()
    val sn = Scanner(System.`in`)

    val comp:List<Computador> = bd.computador(ip)

    val pc = comp[0]
    println("Credenciais verificadas, Iniciando programa!")
    Thread.sleep(2000)

    val user:List<Usuario> = bd.Usuarios(pc)


    while (true) {

        println(
            """Oque deseja fazer?
        |1) Login
        |2) Obter Informações do Usuário logado
        |3) Começar monitoramento
        |4) Exit
    """.trimMargin()
        )

        var acao = (sn.next()).toInt()


        when (acao) {
            1 -> {
                print("Digite seu email: ")
                var email = sn.next()

                print("Digite seu senha: ")
                var senha = sn.next()

                user.forEach{
                    if (it.email == email && it.senha == senha) {
                        sistema.login(it.idUsuario, it.nome, it.email, it.senha, it.cargo)
                    }
                }

            }
            2 -> {
                if (sistema.login){
                    sistema.info()
                } else{
                    println("Por favor, faça login antes de pedir dados do usuário logado.")
                }
            }
            3 -> {
                if (sistema.login) {

                    bd.acessoLog(sistema,pc)

                    var fks: Int
                    var dados: Double
                    println("\n\rEstamos monitorando sua máquina.\n\r")

                    capturarPorcentagemDeUsoDaCPU(bd, pc)
                    // val (arquivo1, arquivo2) = ScriptPython.criarPython(aMonitorar.python(), pc.idDispositivo,
                    //ScriptPython.executarScript(arquivo1,arquivo2)
                    Runtime.getRuntime().addShutdownHook(Thread {
                        println("O monitoramento foi finalizado")
                       // ScriptPython.pararScript()
                    })

                    capturarDadosDeCPU()
                        while (true) {
                           capturarPorcentagemDeUsoDaCPU(bd, pc)
                            println("\n\r")
                            Thread.sleep(5000)
                        }

                } else {
                    println("\n\rFaça login para começar o monitoramento da sua maquina.\n\r")
                }
            }

            4 -> break
        }

    }
}
