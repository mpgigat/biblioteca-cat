import Entry from "../models/entry.js"

const entryHttp = {

    entryGetUsuario: async (req, res) => {
        const { id } = req.params;
        const entry = await Entry.find({holder:id});

        res.json({
            entry
        })
    },

    entryGetById: async (req, res) => {

        const { id } = req.params;

        const entry = await Entry.findById(id);

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
        );

        res.json({
            entry
        })
    },

    entryPost: async (req, res) => {
        const { holder, laptop } = req.body;

        const entry = new Entry({ holder, laptop });

        await entry.save()

        res.json({
            entry
        })

    },

   
}
export default entryHttp