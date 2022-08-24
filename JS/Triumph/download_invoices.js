// downloading invoices from triumph site https://mytriumph.com/DeltaReport/InvoiceList
function download_invoices_by_ids(invoice_ids, invoice_dicts){
    let ind = 0
    for (let invoice_id of invoice_ids) {
        ind += 1
        invoice_key = invoice_dict[invoice_id]
        console.log(ind + ": " + invoice_id + " " + invoice_key)
        download_invoice_by_key(invoice_key)
    }
}

function download_invoice_by_key(invoice_key) {
    var link = document.createElement('a');
    link.setAttribute('download', null);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.setAttribute('href', "https://mytriumph.com/DeltaReport/InvoiceImages/" + invoice_key);
    
    link.click();
    document.body.removeChild(link)
}

// it seemed to only can download 10 at a time
function download_invoices(dict, size=10){
    ids = Object.keys(dict).sort()
    count = ids.length > size ? size: ids.length
    bath_ids = ids.slice(0, count)
    download_invoices_from_ids(batch_ids, dict)
    batch_ids.forEach(id => delete dict[id])
}

invoice_dict = {}
$("a[href^='/DeltaReport/InvoiceDetail/']").each(function(){
    url = this.href.split("/")
    invoice_dict[this.text] = url[url.length -1]
})
