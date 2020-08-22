import {copy} from './Util';
const createTemplate = venda => `<html> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>MERCEARIA ALENCAR - Comprovante</title> <style> @page { margin: 0cm; } </style> </head> <body> <div style="width: 8cm; padding-right: 5px; font-size: 13px; font-weight: bold; font-family: 'Courier New', Courier, monospace;"> <div style="width: 100%; text-align: center;"><span style="font-weight: bold; font-size: 15px;">MERCADO ALENCAR</span></div> <br /> <div style="width: 100%; text-align: center;"><span style="font-weight: bold;">FICHA DE ENTREGA</span></div> <br /> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Cliente</span> <span style="float: right; text-align: right;">${venda.nome}</span></div> <br /> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Telefone</span> <span style="float: right; text-align: right;">${venda.telefone}</span></div> <br /> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Bairro</span> <span style="float: right; text-align: right;">${venda.bairro}</span></div> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Endereço</span> <span style="float: right; text-align: right;">${venda.endereco}</span></div> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Numero</span> <span style="float: right; text-align: right;">${venda.numero || 'S/N'}</span></div> <div style="clear: both;${"display:"+(venda.referencia ? "inherit":"none")}""><span style="float: left; font-weight: bold; font-size: 12px;">Referência</span> <span style="float: right; text-align: right;">${venda.referencia}</span></div> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Cesta</span> <span style="float: right; text-align: right;">${venda.sacolao}</span></div> <br /> <div style="clear: both;"><span style="float: left; font-weight: bold; font-size: 12px;">Compras</span> <span style="float: right; text-align: right;">R$ ${venda.compras || 0}</span></div> <br /> <div style="clear: both;"> <span style="float: left; font-weight: bold; font-size: 12px;">Valor total:</span> <span style="float: right; text-align: right; font-size: 14px;"> <b>R$ ${venda.total}</b> </span> </div> <div style="clear: both; ${"display:"+(venda.troco ? "inherit":"none")}" > <span style="float: left; font-weight: bold; font-size: 12px;">Troco Para</span> <span style="float: right; text-align: right; font-size: 14px;"> <b>R$ ${venda.trocoPara || 0}</b> </span> </div> <div style="clear: both; ${"display:"+(venda.troco ? "inherit":"none")}"> <span style="float: left; font-weight: bold; font-size: 12px;"></span> <span style="float: right; text-align: right; font-size: 14px;"> <b>---------------</b> </span> </div> <br /> <div style="clear: both; ${"display:"+(venda.troco ? "inherit":"none")}"> <span style="float: left; font-weight: bold; font-size: 12px;">Troco</span> <span style="float: right; text-align: right; font-size: 14px;"> <b>R$ ${venda.troco || 0}</b> </span> </div> <br /> <hr /> <div style="clear: both;"> <span style="float: left; font-weight: bold; font-size: 12px;">Entregar às</span> <span style="float: right; text-align: right; font-size: 14px;"> <b>${venda.horaEntrega} ${venda.dataEntrega}</b> </span> </div> <div style="clear: both;"> <span style="float: left; font-weight: bold; font-size: 12px;">Pagamento</span> <span style="float: right; text-align: right; font-size: 14px;"> <b> ${venda.receber ? venda.cartao ? "Cartão" : "Dinheiro" : "Pago"}</b> </span> </div> <br /> <div style="clear: both; ${"display:"+(venda.obs ? "inherit":"none")}""> <span style="float: left; font-weight: bold; font-size: 12px;">OBS</span> <span style="float: right; text-align: right; font-size: 14px;"> <b>${venda.obs}</b> </span> </div> </div> <script> setTimeout(function(){console.log('teste'); window.print(); console.log('imprimindo'); },500); </script> </body> </html>`;

const clean = (model)=>{
  model.trocoPara = model.trocoPara ? model.trocoPara.toString().replace("R$","").replace(",", ".") : 0;
  model.compras = model.compras ? model.compras.toString().replace("R$","").replace(",", ".") : 0;
 }
const convert = (model) => {
    let printable = copy(model);
    clean(printable);
    printable.compras = eval(
      Number(printable.compras).toFixed(2)
    );
    printable.sacolao = eval(Number(printable.sacolao || 0).toFixed(2));
    printable.total = eval(
      Number(printable.compras + eval(printable.sacolao)).toFixed(2)
    );
    printable.trocoPara = eval(
      Number(printable.trocoPara).toFixed(2)
    );
    printable.troco = printable.trocoPara
      ? eval(Number(printable.trocoPara - printable.total).toFixed(2))
      : 0;
    printable.horaEntrega = printable.horaEntrega || "Qualquer hora";
    printable.obs = printable.obs || "";
    printable.referencia = printable.referencia || "";
    printable.dataEntrega = ""; //.dataEntrega.getDay() +'\\' + venda.dataEntrega.getUTCMonth()+'\\' +venda.dataEntrega.getUTCFullYear();

    return printable;
}

const print = (model) => {
    var printable = convert(model);
    var template = createTemplate(printable)
    var w = window.open(template, "wnd");
    w.document.write(template);
}

export default print;