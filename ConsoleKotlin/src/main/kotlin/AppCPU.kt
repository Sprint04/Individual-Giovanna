// inicio de mudança

import com.github.britooo.looca.api.core.Looca
import java.util.Timer
import java.util.TimerTask
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun capturarDadosDeCPU() {
    val looca = Looca()
    val processador = looca.processador

    val informacao = CPU()
    informacao.nomeCPU = processador.nome

    val dataHoraCaptura = LocalDateTime.now()

    println("Informações da CPU:")
    println("Nome: ${processador.nome}")

    val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))
    println("Data e Hora da Captura: $dataFormatada")

    // Captura a porcentagem de uso da CPU
    //val porcentagemUso = processador.uso
    //val porcentagemArredondada = String.format("%.2f", porcentagemUso)

    // Adicione a porcentagem de uso ao objeto informacao
    //informacao.porcentagemUsoCPU = porcentagemArredondada

    // inserir os dados no banco de dados
    val bd = Repositorio()
    bd.iniciar()

}

fun capturarPorcentagemDeUsoDaCPU(bd: Repositorio, pc: Computador) {
    val looca = Looca()
    val timer = Timer()
    val informacao = CPU()

    val task = object : TimerTask() {
        override fun run() {
            val processador = looca.processador
            val porcentagemUso = processador.uso
            val porcentagemArredondada = String.format("%.2f", porcentagemUso)


            informacao.nomeCPU = processador.nome

            informacao.porcentagemUsoCPU = porcentagemArredondada


            val dataHoraCaptura = LocalDateTime.now()
            val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))

            informacao.dataHoraCaptura = dataFormatada

            // Imprima a porcentagem de uso da CPU e a data/hora da captura
            println("Uso da CPU: $porcentagemArredondada%")
            println("Data e Hora da Captura: $dataFormatada")

            bd.insertDadosCPU(pc, informacao)

        }
    }

    timer.schedule(task, 0, 10000)
}



