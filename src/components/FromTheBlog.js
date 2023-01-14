export default function FromTheBlog() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            From the blog
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            veritatis sint autem nesciunt, laudantium quia tempore delect
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          <div className="h-full rounded-md shadow">
            <img
              className="relative z-10 object-cover w-full rounded-md h-96"
              src={`https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1019204/image_0-1967657e3078be54d78ccc4d57eae106-f763757d0bd43e58ff9976083b458547.png`}
              alt=""
            />

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white  dark:bg-gray-900 text-lg">
              <p className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                What are the different ways to manage a state in a React
                application?
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 ">
                React state management is a process for managing the data that
                React components need in order to render themselves. This data
                is typically stored in the component's state object. When the
                state object changes, the component will re-render itself. React
                state management is basically half of a React app.
              </p>

              <ul className="mt-3 text-sm text-gray-500 dark:text-gray-300  list-decimal ml-4">
                <li>Context API</li>
                <li>Redux</li>
                <li>MobX</li>
                <li>XState</li>
                <li>Recoil</li>
                <li>Zustand</li>
                <li>etc.</li>
              </ul>

              <p className="mt-3 text-sm text-blue-500">21 October 2022</p>
            </div>
          </div>

          <div className="h-full rounded-md shadow">
            <img
              className="relative z-10 object-cover w-full rounded-md h-96"
              src={`data:image/jpeg;base64,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`}
              alt=""
            />

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white dark:bg-gray-900">
              <p className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                How does prototypical inheritance work?
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 ">
                The Prototypal Inheritance is a feature in javascript used to
                add methods and properties in objects. It is a method by which
                an object can inherit the properties and methods of another
                object. Traditionally, in order to get and set the [[Prototype]]
                of an object, we use Object. getPrototypeOf and Object.
              </p>

              <p className="mt-3 text-sm text-blue-500">02 September 2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
