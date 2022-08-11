import Entry from "../models/entry.js"
import Laptop from "../models/laptop.js";

const entryHttp = {

    entryGetUsuario: async (req, res) => {
        const { id } = req.params;
        const entry = await Entry.find({holder:id})
        .populate("holder")
        .populate("laptop");

        res.json({
            entry
        })
    },

    entryGetById: async (req, res) => {

        const { id } = req.params;

        const entry = await Entry.findById(id).populate("holder").populate("laptop");

        res.json({
            entry
        })
    },

    entryGetDateFilter: async (req, res) => {
        const { datefilter } = req.params;
        let fechaI=`${datefilter}T00:00:00.000-05:00`
        let fechaF=`${datefilter}T23:59:59.000-05:00`                                 
        const entry = await Entry.find({
            $and: [
              {
                entrytime: {
                  $gte: new Date(fechaI)
                }
              },
              {
                entrytime: {
                  $lte: new Date(fechaF)
                }
              }
            ]
          }
        ).populate("holder").populate("laptop");

        res.json({
            entry
        })
    },

    entryGetDateBetween: async (req, res) => {
        const { initialdate,finaldate } = req.params;
        let fechaI=`${initialdate}T00:00:00.000-05:00`
        let fechaF=`${finaldate}T23:59:59.000-05:00`                                 
        const entry = await Entry.find({
            $and: [
              {
                entrytime: {
                  $gte: new Date(fechaI)
                }
              },
              {
                entrytime: {
                  $lte: new Date(fechaF)
                }
              }
            ]
          }
        ).populate("holder").populate("laptop");

        res.json({
            entry
        })
    },

    entryPost: async (req, res) => {
        const { holder, laptop } = req.body;
        let laptopSearch = await Laptop.findOne({serial:laptop})
        const entry = new Entry({ holder, laptop:laptopSearch._id });

        await entry.save()

        res.json({
            entry
        })

    },

   
}
export default entryHttp