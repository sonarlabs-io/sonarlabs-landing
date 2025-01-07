type Theme = 'light' | 'dark';

export const getThemeStyles = (theme: Theme) => ({
  layout: {
    page: `min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`,
    main: "container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8",
    section: "space-y-4 sm:space-y-6 lg:space-y-8",
    header: {
      container: "flex flex-col sm:flex-row sm:justify-between sm:items-start mt-4 sm:mt-6 lg:mt-10 gap-4 sm:gap-6",
      titleWrapper: "space-y-1",
      title: `text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
      subtitle: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`,
      searchContainer: "w-full sm:w-[320px] lg:w-1/3",
    },
    content: {
      section: "min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]",
      header: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0",
      title: `text-xl sm:text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
      grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr`, // Added auto-rows-fr
    },
    footer: {
      wrapper: `border-t mt-8 sm:mt-12 ${
        theme === 'dark' 
          ? 'border-gray-800 bg-black' 
          : 'border-gray-200 bg-white'
      }`,
      container: "container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
      content: "flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0",
      text: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`,
    },
  },

  nav: {
    wrapper: `sticky top-0 z-50 w-full border-b ${
      theme === 'dark' 
        ? 'border-[#444444] bg-[#333333]' 
        : 'border-gray-200 bg-white'
    }`,
    container: "mx-auto max-w-7xl h-14 flex items-center justify-between px-4",
    logoContainer: "flex items-center",
    logo: `font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
    content: "flex flex-1 justify-center",
    list: "flex items-center space-x-8",
    item: `flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      theme === 'dark'
        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
    }`,
    itemActive: `${
      theme === 'dark'
        ? 'bg-gray-800 text-white'
        : 'bg-gray-100 text-black'
    }`,
    profile: "flex items-center space-x-4 ml-8",
  },

  artistCard: {
    wrapper: `overflow-hidden rounded-lg border ${
      theme === 'dark'
        ? 'bg-[#111111] border-[#333333]'
        : 'bg-white border-gray-200'
    }`,
    content: "p-0",
    image: "w-full h-48 object-cover",
    details: "p-4",
    title: `text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
    genres: theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-600',
    score: theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-600',
  },

  artistDetails: {
    container: `max-w-4xl w-full mx-auto ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`,
    header: "space-y-4",
    title: `text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
    genres: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    closeButton: `${
      theme === 'dark' 
        ? 'text-gray-400 hover:text-white' 
        : 'text-gray-600 hover:text-black'
    }`,
    actionButton: `${
      theme === 'dark'
        ? 'border-gray-700 hover:bg-gray-800'
        : 'border-gray-200 hover:bg-gray-100'
    }`,
    section: `${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-gray-50 border-gray-200'
    } rounded-lg p-4 border`,
    sectionHeader: `flex items-center gap-2 mb-4 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    } font-semibold`,
    sectionContent: "space-y-4",
    stat: `flex justify-between items-center ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    }`,
    ratios: "grid grid-cols-3 gap-2",
    socials: "grid grid-cols-1 gap-2",
  },

  modal: {
    container: `w-[calc(100%-2rem)] sm:max-w-md mx-auto p-4 sm:p-6 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`,
    title: `text-lg sm:text-xl font-semibold mb-2 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`,
    content: 'space-y-4',
    label: `text-sm font-medium ${
      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
    }`,
    text: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    input: `w-full ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700 text-white focus:border-gray-900'
        : 'bg-white border-gray-300 text-gray-900 focus:border-gray-900'
    }`,
    textarea: `w-full ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700 text-white focus:border-gray-900'
        : 'bg-white border-gray-300 text-gray-900 focus:border-gray-900'
    }`,
    error: 'text-red-500 text-sm mt-1',
    buttonContainer: 'flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4',
    cancelButton: `w-full sm:w-auto order-2 sm:order-1 ${
      theme === 'dark'
        ? 'border-gray-700 hover:bg-gray-800 text-gray-300'
        : 'border-gray-200 hover:bg-gray-100 text-gray-700'
    }`,
    submitButton: 'w-full sm:w-auto order-1 sm:order-2 bg-black hover:bg-gray-900 text-white',
  },

  projects: {
    container: 'container mx-auto px-4 py-8',
    header: 'mb-12',
    title: `text-4xl font-bold mb-2 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`,
    subtitle: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    content: 'space-y-8',
    projectRow: `p-6 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`,
    projectInfo: 'flex flex-col gap-4',
    projectHeader: 'flex items-baseline gap-4',
    projectNumber: `text-sm font-medium ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
    }`,
    projectTitle: `text-xl font-semibold ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`,
    artistPreviews: 'flex -space-x-3',
    artistPreview: 'w-12 h-12 rounded-full border-2 object-cover',
    actions: 'flex justify-end gap-4 mt-6',
    resumeButton: theme === 'dark' 
      ? 'border-gray-700 hover:bg-gray-700'
      : 'border-gray-200 hover:bg-gray-100',
    deleteButton: theme === 'dark'
      ? 'border-gray-700 hover:bg-red-900/20 text-red-400 hover:text-red-300'
      : 'border-gray-200 hover:bg-red-50 text-red-600 hover:text-red-700',
  },

  search: {
    container: "relative",
    inputGroup: "flex gap-2",
    inputWrapper: "relative flex-1",
    input: `pr-10 ${
      theme === 'dark'
        ? 'bg-[#111111] border-[#333333] text-white placeholder:text-gray-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
    } focus:ring-2 focus:ring-gray-900`,
    clearButton: `absolute right-2 top-1/2 -translate-y-1/2 ${
      theme === 'dark'
        ? 'text-gray-400 hover:text-gray-200'
        : 'text-gray-500 hover:text-gray-700'
    }`,
    searchButton: `w-24 ${
      theme === 'dark'
        ? 'bg-[#333333] hover:bg-[#444444] text-white'
        : 'bg-black hover:bg-gray-800 text-white'
    }`,
    results: {
      container: `absolute right-0 mt-2 w-full max-w-md rounded-lg border shadow-lg z-50 ${
        theme === 'dark'
          ? 'bg-[#111111] border-[#333333]'
          : 'bg-white border-gray-200'
      }`,
      content: "p-4",
      header: "flex justify-between items-center mb-4",
      title: `text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
      list: "space-y-4 max-h-[60vh] overflow-y-auto",
      viewToggle: `flex items-center space-x-2 p-2 w-full text-sm rounded-md mb-4 border border-dashed ${
        theme === 'dark'
          ? 'text-gray-400 hover:bg-[#222222] border-[#333333]'
          : 'text-gray-600 hover:bg-gray-50 border-gray-200'
      }`,
    },
  },

  loading: {
    container: "flex justify-center items-center min-h-[200px]",
    spinner: `h-8 w-8 animate-spin ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`,
  },
});

// Utility styles that don't need theming
export const styles = {
  icon: "h-4 w-4",
  iconWithSpace: "h-4 w-4 mr-2",
} as const;