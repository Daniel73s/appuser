import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRious from 'qrious';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }


  public pedidosProveedorMesPDF(data: any[],proveedor:any) {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título del PDF
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Reporte de Pedidos', pageWidth / 2, 20, { align: 'center' });

    // Subtítulo
    doc.setFontSize(14);
    doc.text('(Mes de Agosto)', pageWidth / 2, 30, { align: 'center' });

    // Información del Proveedor (Izquierda)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Proveedor:${proveedor.razon_social.toLowerCase()}`, 10, 40);
    doc.text(`Nit: ${proveedor.nit || 'sin nit'}`, 10, 50);

    // Información del Colegio (Derecha)
    doc.setFontSize(12);
    doc.setTextColor(100);
    const InfoX = pageWidth - 80; // Ajusta este valor según sea necesario
    doc.text(`Celular: ${proveedor.celular}`, InfoX, 40);
    doc.text(`Zona: ${proveedor.zona.toLowerCase()}`, InfoX, 50);

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(194, 191, 189);
    doc.line(10, 55, pageWidth - 10, 55);

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 65);

    // Generar código QR
    const qr = new QRious({
      value: proveedor.id_proveedor, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);


    // Encabezados de la tabla
    const col = ['Fecha Entrega', 'Fecha Creacion', 'Colegio','Producto','Cantidad','Estado'];
    const rows: any[] = [];

    // Datos de la tabla
    data.forEach(pedido => {
      const temp = [
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        new Date(pedido.fecha_creacion).toLocaleDateString(),
        pedido.colegio,
        pedido.producto,
        pedido.cantidad.toString(),
        pedido.estado.toUpperCase()
      ];
      rows.push(temp);
    });

    // Agregar la tabla al PDF usando autoTable
    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 70,
      theme: 'grid',
      headStyles: {
        fillColor: [247, 139, 54], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3 // Espaciado interno de las celdas
      }
    });

    // Guardar el PDF
    doc.save('reporte_pedidos.pdf');
  }

  // generatePDF(data: any[]) {
  //   const doc = new jsPDF();

  //   // Encabezado del PDF
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();

  //   // Título del PDF
  //   doc.setFontSize(22);
  //   doc.setTextColor(40);
  //   doc.text('Reporte de Pedidos', pageWidth / 2, 30, { align: 'center' });

  //   // Subtítulo
  //   doc.setFontSize(14);
  //   doc.text('Pedidos del mes seleccionado', pageWidth / 2, 40, { align: 'center' });

  //   // Línea divisoria
  //   doc.setLineWidth(0.5);
  //   doc.line(10, 45, pageWidth - 10, 45);

  //   // Información adicional
  //   doc.setFontSize(10);
  //   doc.setTextColor(100);
  //   doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 50);

  //   // Encabezados de la tabla
  //   const col = ['ID', 'Producto', 'Cantidad', 'Fecha de Entrega'];
  //   const rows: any[] = [];

  //   // Datos de la tabla
  //   data.forEach(pedido => {
  //     const temp = [
  //       pedido.id_pedido.toString(),
  //       pedido.producto,
  //       pedido.cantidad.toString(),
  //       pedido.fecha_entrega
  //     ];
  //     rows.push(temp);
  //   });

  //   // Agregar la tabla al PDF usando autoTable
  //   (doc as any).autoTable({
  //     head: [col],
  //     body: rows,
  //     startY: 60,
  //     theme: 'grid',
  //     headStyles: {
  //       fillColor: [22, 160, 133],
  //       textColor: 255,
  //       fontSize: 12
  //     },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 3
  //     }
  //   });

  //   // Pie de página
  //   const totalPagesExp = '{total_pages_count_string}';
  //   (doc as any).autoTable({
  //     didDrawPage: (data: any)=> {
  //       // Footer
  //       let str = 'Página ' + (doc as any).internal.getNumberOfPages();
  //       if (typeof doc.putTotalPages === 'function') {
  //         str = str + ' de ' + totalPagesExp;
  //       }
  //       doc.setFontSize(10);
  //       doc.text(str, data.settings.margin.left, pageHeight - 10);
  //     }
  //   });

  //   // Reemplaza el marcador de páginas total
  //   if (typeof doc.putTotalPages === 'function') {
  //     doc.putTotalPages(totalPagesExp);
  //   }

  //   // Guardar el PDF
  //   doc.save('reporte_pedidos.pdf');
  // }

  // generatePDF(data: any[]) {
  //   const doc = new jsPDF();

  //   // Título del PDF
  //   doc.setFontSize(18);
  //   doc.text('Reporte de Pedidos', 10, 10);

  //   // Subtítulo
  //   doc.setFontSize(12);
  //   doc.text('Pedidos del mes seleccionado', 10, 20);

  //   // Encabezados de la tabla
  //   const col = ['ID', 'Producto', 'Cantidad', 'Fecha de Entrega'];
  //   const rows: any[] = [];

  //   // Datos de la tabla
  //   data.forEach(pedido => {
  //     const temp = [
  //       pedido.id_pedido.toString(),
  //       pedido.producto,
  //       pedido.cantidad.toString(),
  //       pedido.fecha_entrega
  //     ];
  //     rows.push(temp);
  //   });

  //   // Agregar la tabla al PDF usando autoTable
  //   (doc as any).autoTable({
  //     head: [col],
  //     body: rows,
  //     startY: 30
  //   });

  //   // Guardar el PDF
  //   doc.save('reporte_pedidos.pdf');
  // }
}
