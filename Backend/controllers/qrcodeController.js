const QrCode = require('qrcode');

exports.scanQrCode = async (req,res) => {

    const url = req.body.url;
    if(url.length === 0) {
        res.send('Empty Data');
    }

    QrCode.toDataURL(url, function(err, url){
        console.log(url);
        res.send(url);
    })
}