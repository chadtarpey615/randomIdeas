const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// get all ideas
router.get("/", async (req, res) => {
    try
    {
        const ideas = await Idea.find()
        res.json({ success: true, data: ideas })
    } catch (error)
    {
        res.status(500).json({ success: false, error: error.message })
    }
})


// get single idea
router.get("/:id", async (req, res) => {
    try
    {
        const idea = await Idea.findById(req.params.id)


        res.json({
            success: true,
            data: idea
        })
    }

    catch (error)
    {
        res.status(500).json({ success: false, error: error.message })
    }
})


// create idea
router.post("/", async (req, res) => {
    const { text, tag, username } = req.body

    const idea = new Idea({
        // id: ideas.length + 1,
        text: text,
        tag: tag,
        username: username
    })

    try
    {
        const savedIdea = await idea.save()
        res.json({ success: true, data: savedIdea })
    } catch (error)
    {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
})



// update idea

router.put("/:id", async (req, res) => {
    try
    {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag,
                }
            },

            { new: true }
        )
        res.json({ success: true, data: updatedIdea })

    } catch (error)
    {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
})





// delete idea

router.delete("/:id", async (req, res) => {
    try
    {
        await Idea.findByIdAndDelete(req.params.id)
        res.json({ success: true, data: {} })

    } catch (error)
    {

        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }

})





module.exports = router; 