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