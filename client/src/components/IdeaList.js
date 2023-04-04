import IdeasApi from "../../services/ideasApi";

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = []
        this.getIdeas();
        this._validTags = new Set()
        this._validTags.add('Business')
        this._validTags.add('technology')
        this._validTags.add('education')
        this._validTags.add('health')
        this._validTags.add('inventions')
        this._validTags.add('software')
        // this._ideaList.addEventListener('click', this._handleClick.bind(this));
    }

    async getIdeas() {
        try
        {
            const res = await IdeasApi.getIdeas();
            // axios puts the response data in the data property
            this._ideas = res.data.data;
            this.render()
        } catch (error)
        {
            console.log(error)
        }
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validTags.has(tag))
        {
            tagClass = `tag-${tag}`
        } else
        {
            tagClass = ''
        }
        return tagClass;
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            return `
               <div class="card">
        <button class="delete"><i class="fas fa-times"></i></button>
        <h3>
         ${idea.text}
        </h3>
        <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
            `
        }).join('')
    }
}

export default IdeaList;