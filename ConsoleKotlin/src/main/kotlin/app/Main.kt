package app

import Repositorio
import com.github.britooo.looca.api.core.Looca
import sistema

open class Main {
    companion object {
        @JvmStatic fun main(args: Array<String>) {
            val bd = Repositorio()
            val looca = Looca()

            bd.iniciar()

            val ip = looca.rede.parametros.hostName
            sistema(bd, looca, ip)
        }
    }
}