import Laptop from "../models/laptop.js"
import QRCode from 'qrcode'
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import barcode from "barcode"
import { DOMImplementation, XMLSerializer } from "xmldom"
import JsBarcode from "jsbarcode"

const laptopHttp = {

    laptopGet: async (req, res) => {
        const { search } = req.query;

        const laptop = await Laptop.find(
            {
                $or: [
                    { serial: new RegExp(search, "i") }
                ]
            }
        );

        res.json({
            laptop
        })
    },

    laptopGetById: async (req, res) => {

        const { id } = req.params;

        const laptop = await Laptop.findById(id);

        res.json({
            laptop
        })
    },

    laptopGetHolderById: async (req, res) => {

        const { id } = req.params;

        const laptop = await Laptop.find({ holder: id });

        res.json({
            laptop
        })
    },

    laptopPost: async (req, res) => {
        const { holder, serial, observation } = req.body;

        const laptop = new Laptop({ holder, serial, observation });

        await laptop.save()

        res.json({
            laptop
        })

    },

    laptopPut: async (req, res) => {
        const { id } = req.params;

        const { _id, state, qrcode, codebar, createdAt, ...resto } = req.body;

        const laptop = await Laptop.findByIdAndUpdate(id, resto);

        res.json({
            laptop
        })
    },

    laptopPutActivate: async (req, res) => {
        const { id } = req.params;

        const laptop = await Laptop.findByIdAndUpdate(id, { state: 1 });

        res.json({
            laptop
        })
    },

    laptopPutDeactivate: async (req, res) => {
        const { id } = req.params;

        const laptop = await Laptop.findByIdAndUpdate(id, { state: 0 });

        res.json({
            laptop
        })
    },

    laptopQRCodeGenerateToFile: async (req, res) => {
        const { id } = req.params
        const existe = await Laptop.findById(id)
        if (existe) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, `../uploads/${id}.png`);

            QRCode.toFile(pathImage,
                existe.serial
                , async (err, src) => {
                    if (err) res.json({ msg: "Error occured" });
                    if (fs.existsSync(pathImage)) {
                        return res.sendFile(pathImage)
                    } else { res.json({ msg: "Error occured" }); }
                });


            // QRCode.toString("www.google.com", { type: 'terminal' }, async (err, src) => {
            //     if (err) res.json({ msg: "Error occured" });
            //     console.log('hola', src);


            //    // res.render("scan", { src });
            // });
        } else {
            res.json({ msg: "Error!!!" })
        }

    },

    laptopQRCodeGenerateHtml: async (req, res, next) => {
        const { id } = req.params
        const existe = await Laptop.findById(id)
        if (existe) {

            const opts = {
                errorCorrectionLevel: 'H',
                type: 'terminal',
                quality: 0.95,
                margin: 1,
                color: {
                    dark: '#208698',
                    light: '#FFF',
                },
            }
            try {
                QRCode.toDataURL(existe.serial, opts, (err, image_data) => {
                    res.json({ secret_uri: image_data });
                });
            } catch (error) {
                res.json({ error })
            }
        }
    },
    laptopBarcodeHtml: async (req, res) => {
        const { id } = req.params
        const existe = await Laptop.findById(id)
        if (existe) {
            const code39 = barcode('code39', {
                data: existe.serial,
                width: 400,
                height: 100
            })
            try {
                code39.getBase64(function (err, imagsrc) {
                    console.log("hola");

                    if (err) throw new Error(err);
                    res.end(imagsrc)
                })

            } catch (error) {
                res.json({ error })
            }

        } else {
            res.json({ msg: "Error!!!" })
        }

    },
    prueba: async (req, res) => {
        
        
        const xmlSerializer = new XMLSerializer();
        const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
        const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        JsBarcode(svgNode, 'test', {
            xmlDocument: document,
        });
        
        const svgText = xmlSerializer.serializeToString(svgNode);
        res.send(svgText)
    }
}
export default laptopHttp