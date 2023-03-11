export default function Blog() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-[98%] md:container mt-8">
        <div className="grid grid-cols-1 gap-5 -mt-6 lg:grid-cols-2 auto-rows-fr">
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

              <p className="mt-3 text-sm text-cyan-500">21 October 2022</p>
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

              <p className="mt-3 text-sm text-cyan-500">02 September 2019</p>
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
                What is a unit test? Why should we write unit tests?
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 ">
                A unit test is a way of testing a unit - the smallest piece of
                code that can be logically isolated in a system. In most
                programming languages, that is a function, a subroutine, a
                method or property. The isolated part of the definition is
                important. In his book "Working Effectively with Legacy Code",
                author Michael Feathers states that such tests are not unit
                tests when they rely on external systems: “If it talks to the
                database, it talks across the network, it touches the file
                system, it requires system configuration, or it can't be run at
                the same time as any other test.
              </p>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 ">
                Unit testing ensures that all code meets quality standards
                before it's deployed. This ensures a reliable engineering
                environment where quality is paramount. Over the course of the
                product development life cycle, unit testing saves time and
                money, and helps developers write better code, more efficiently.
              </p>

              <p className="mt-3 text-sm text-cyan-500">28 August 2019</p>
            </div>
          </div>
          <div className="h-full rounded-md shadow">
            <img
              className="relative z-10 object-cover w-full rounded-md h-96"
              src="data:image/jpeg;base64,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"
              alt=""
            />

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white dark:bg-gray-900">
              <p className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                React vs. Angular vs. Vue?
              </p>

              <ul className="mt-3 text-sm text-gray-500 dark:text-gray-300  list-decimal ml-4">
                <li>
                  <strong> Angular</strong>: <br />
                  In Angular, components are referred to as directives.
                  Directives are just markers on DOM elements, which Angular can
                  track and attach specific behavior too. Therefore, Angular
                  separates the UI part of components as attributes of HTML
                  tags, and their behaviors in the form of JavaScript code. This
                  is what sets it apart when looking at Angular vs React.
                </li>{' '}
                <li>
                  <strong> React</strong>: <br />
                  React, interestingly, combines the UI and behavior of
                  components. For instance, here is the code to create a hello
                  world component in React. In React, the same part of the code
                  is responsible for creating a UI element and dictating its
                  behavior.
                </li>{' '}
                <li>
                  <strong> Vue</strong>: <br />
                  When looking into Vue vs React, in Vue, UI and behavior are
                  also a part of components, which makes things more intuitive.
                  Also, Vue is highly customizable, which allows you to combine
                  the UI and behavior of components from within a script.
                  Further, you can also use pre-processors in Vue rather than
                  CSS, which is a great functionality. Vue is great when it
                  comes to integration with other libraries, like Bootstrap.
                </li>
              </ul>

              <p className="mt-3 text-sm text-cyan-500">20 October 2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
