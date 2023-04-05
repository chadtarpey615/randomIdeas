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
        const idea = await Idea.findById(req.params.id)

        // match the usernames
        if (idea.username === req.body.username)
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
            return res.json({ success: true, data: updatedIdea })
        }

        // usernames do not match
        return res.status(403).json({ success: false, error: "You are not authorized to update this idea" })

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
        const idea = await Idea.findById(req.params.id)

        // match the usernames
        if (idea.username === req.body.username)
        {

            await Idea.findByIdAndDelete(req.params.id)
            return res.json({ success: true, data: {} })
        }

        // usernames do not match
        return res.status(403).json({ success: false, error: "You are not authorized to delete this idea" })

    } catch (error)
    {

        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }

})





module.exports = router; 