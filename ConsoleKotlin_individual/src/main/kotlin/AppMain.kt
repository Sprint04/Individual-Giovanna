import com.github.britooo.looca.api.core.Looca

fun main() {
    val bd = Repositorio()
    val looca = Looca()


    var ip = getMac()

    sistema(bd,looca, ip)
}