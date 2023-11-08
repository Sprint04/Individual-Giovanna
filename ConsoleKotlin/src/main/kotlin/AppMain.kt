import com.github.britooo.looca.api.core.Looca

fun main() {
    val bd = Repositorio()
    val looca = Looca()

    bd.iniciar()

    val ip = looca.rede.parametros.hostName
}