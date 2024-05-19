import logo from "../assets/icons/lucastorelogo.svg"

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src={logo} className="w-48 h-8" alt="Logo LucaStore" />
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 LucaStore —
            <a href="https://github.com/VS-Lucas" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@VS-Lucas</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://instagram.com/luucas_vs/" target="_blank" className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/lucas-vinicius-silva/" target="_blank" className="ml-3 text-gray-500">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;