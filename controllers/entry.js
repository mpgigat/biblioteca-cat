import Entry from "../models/entry.js"
import Laptop from "../models/laptop.js";
import Holder from "../models/holder.js";

const entryHttp = {

  entryGet: async (req, res) => {

    const { id } = req.params;

    const entry = await Entry.find()
      .populate("documentlearner")
      .populate("place")
      .populate("holder")
      .populate({
        path: "laptop", 
        populate: {
          path: "holder"
        }
      });

    res.json({
      entry
    })
  },

  entryGetById: async (req, res) => {

    const { id } = req.params;

    const entry = await Entry.findById(id)
      .populate("documentlearner")
      .populate("place")
      .populate("holder")
      .populate({
        path: "laptop",
        populate: {
          path: "holder"
        }
      });

    res.json({
      entry
    })
  },

  
  entryGetHistoricalHolder: async (req, res) => {
    const { holder } = req.params;
    const entry = await Entry.find({ holder })
      .populate("holder")
      .populate("place")
      .populate("documentlearner")
      .populate({
        path: "laptop",
        populate: {
          path: "holder"
        }
      })

    res.json({
      entry
    })
  },

  entryGetHistoricalLearner: async (req, res) => {
    const { learner } = req.params;
    const entry = await Entry.find({ documentlearner: learner })
      .populate("holder")
      .populate("place")
      .populate("documentlearner")
      .populate({
        path: "laptop",
        populate: {
          path: "holder"
        }
      })

    res.json({
      entry
    })
  },

  entryGetDateFilter: async (req, res) => {
    const { datefilter } = req.params;
    let fechaI = `${datefilter}T00:00:00.000-05:00`
    let fechaF = `${datefilter}T23:59:59.000-05:00`
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
    ).populate("holder").populate({
      path: "laptop",
      populate: {
        path: "holder"
      }
    }).populate("place")
    .populate("documentlearner");

    res.json({
      entry
    })
  },

  entryGetDateBetween: async (req, res) => {
    const { initialdate, finaldate } = req.params;
    let fechaI = `${initialdate}T00:00:00.000-05:00`
    let fechaF = `${finaldate}T23:59:59.000-05:00`
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
    ).populate("holder").populate({
      path: "laptop",
      populate: {
        path: "holder"
      }
    }).populate("place")
    .populate("documentlearner");

    res.json({
      entry
    })
  },


  entryGetPendientesEntregaHolder: async (req, res) => {
    const { id } = req.params;

    const entry = await Entry.find({
      checkout: "", holder:id
    })
      .populate("documentlearner")
      .populate("holder")
      .populate("place")
      .populate({
        path: "laptop",
        populate: {
          path: "holder"
        }
      });

    res.json({
      entry
    })
  },

  entryGetPendientesEntregaPlace: async (req, res) => {
    const { id } = req.params;

    const entry = await Entry.find({
      checkout: "", place:id
    })
      .populate("documentlearner")
      .populate("holder")
      .populate("place")
      .populate({
        path: "laptop",
        populate: {
          path: "holder"
        }
      });

    res.json({
      entry
    })
  },


  entryGetPendientesTotalHolder: async (req, res) => {
    const { id } = req.params;

    const entry = await Entry.find({
      checkout: "", holder: id
    }).populate("documentlearner")
    .populate("holder")
    .populate("place")
    .populate({
      path: "laptop",
      populate: {
        path: "holder"
      }
    });

    res.json({
      total: entry.length
    })
  },

  entryGetPendientesTotalPlace: async (req, res) => {
    const { id } = req.params;

    const entry = await Entry.find({
      checkout: "", place: id
    }).populate("documentlearner")
    .populate("holder")
    .populate("place")
    .populate({
      path: "laptop",
      populate: {
        path: "holder"
      }
    });

    res.json({
      total: entry.length
    })
  },

  entryPost: async (req, res) => {
    const { holder, laptop, documentlearner ,place} = req.body;
    let laptopSearch = await Laptop.findOne({ serial: laptop })
    let entry;
    if (documentlearner && req.holder.rol == "BIBLIOTECARIA") {
      const userLearner = await Holder.findOne({ document: documentlearner });
      entry = new Entry({ holder, laptop: laptopSearch._id, documentlearner: userLearner._id ,place});
    } else {
      entry = new Entry({ holder, laptop: laptopSearch._id ,place});
    }

    await entry.save()

    res.json({
      entry
    })

  },



  entryPut: async (req, res) => {
    const { id } = req.params;

    const today = new Date();

    const entry = await Entry.findByIdAndUpdate(id, { checkout: today });

    res.json({
      entry
    })

  },


}
export default entryHttp