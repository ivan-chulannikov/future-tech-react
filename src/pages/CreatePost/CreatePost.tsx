import { CreatePostForm } from "@/features/add-post";


const CreatePost = () => {
    return (
        <section className="create-post">
            <div className="create-post__inner container">
                <header className="create-post__header">
                    <p className="create-post__eyebrow">Create publication</p>

                    <h1 className="create-post__title">Create publication</h1>

                    <p className="create-post__subtitle">
                        Share your ideas, research and technology insights with the FutureTech
                        community.
                    </p>
                </header>
                <CreatePostForm />
               
            </div>
        </section>
    );
};

export default CreatePost;