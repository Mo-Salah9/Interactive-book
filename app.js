// PDF.js worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Application state
const state = {
    pdfDoc: null,
    currentPage: 1,
    totalPages: 0,
    scale: 1.5,
    config: null
};

// DOM elements
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');
const hotspotContainer = document.getElementById('hotspotContainer');
const modal = document.getElementById('modelModal');
const closeModalBtn = document.getElementById('closeModal');
const modelViewer = document.getElementById('modelViewer');
const modelTitle = document.getElementById('modelTitle');
const modelDescription = document.getElementById('modelDescription');

// Initialize the application
async function init() {
    try {
        // Load configuration
        await loadConfig();

        // Load PDF
        await loadPDF('book.pdf');

        // Setup event listeners
        setupEventListeners();

        // Render first page
        await renderPage(state.currentPage);
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Error loading the interactive book. Please check the console for details.');
    }
}

// Load configuration file
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        state.config = await response.json();
        console.log('Configuration loaded:', state.config);
    } catch (error) {
        console.error('Error loading config:', error);
        // Use default empty config
        state.config = { pages: [] };
    }
}

// Load PDF document
async function loadPDF(url) {
    try {
        const loadingTask = pdfjsLib.getDocument(url);
        state.pdfDoc = await loadingTask.promise;
        state.totalPages = state.pdfDoc.numPages;
        console.log(`PDF loaded: ${state.totalPages} pages`);
    } catch (error) {
        console.error('Error loading PDF:', error);
        throw new Error('Failed to load PDF file. Make sure "book.pdf" exists in the same directory.');
    }
}

// Render a specific page
async function renderPage(pageNum) {
    try {
        // Get page
        const page = await state.pdfDoc.getPage(pageNum);

        // Calculate viewport
        const viewport = page.getViewport({ scale: state.scale });

        // Set canvas dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page to canvas
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        // Update page indicator
        pageIndicator.textContent = `Page ${pageNum} of ${state.totalPages}`;

        // Update navigation buttons
        prevBtn.disabled = pageNum <= 1;
        nextBtn.disabled = pageNum >= state.totalPages;

        // Render hotspots for this page
        renderHotspots(pageNum, viewport.width, viewport.height);

    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// Render clickable hotspots on the page
function renderHotspots(pageNum, pageWidth, pageHeight) {
    // Clear existing hotspots
    hotspotContainer.innerHTML = '';

    // Find hotspots for current page
    const pageConfig = state.config.pages.find(p => p.page === pageNum);

    if (!pageConfig || !pageConfig.hotspots) {
        return;
    }

    // Create hotspot elements
    pageConfig.hotspots.forEach((hotspot, index) => {
        const hotspotEl = document.createElement('div');
        hotspotEl.className = 'hotspot';

        // Calculate position and size based on percentage
        const left = (hotspot.x / 100) * pageWidth;
        const top = (hotspot.y / 100) * pageHeight;
        const width = (hotspot.width / 100) * pageWidth;
        const height = (hotspot.height / 100) * pageHeight;

        hotspotEl.style.left = `${left}px`;
        hotspotEl.style.top = `${top}px`;
        hotspotEl.style.width = `${width}px`;
        hotspotEl.style.height = `${height}px`;

        // Add label
        if (hotspot.label) {
            const label = document.createElement('div');
            label.className = 'hotspot-label';
            label.textContent = hotspot.label;
            hotspotEl.appendChild(label);
        }

        // Add click event
        hotspotEl.addEventListener('click', () => {
            openModelViewer(hotspot);
        });

        hotspotContainer.appendChild(hotspotEl);
    });
}

// Open 3D model viewer modal
function openModelViewer(hotspot) {
    // Set model source
    modelViewer.setAttribute('src', hotspot.model);

    // Set iOS USDZ model for AR if available
    if (hotspot.iosModel) {
        modelViewer.setAttribute('ios-src', hotspot.iosModel);
    }

    // Set poster image if available
    if (hotspot.poster) {
        modelViewer.setAttribute('poster', hotspot.poster);
    }

    // Set title and description
    modelTitle.textContent = hotspot.title || '3D Model Viewer';
    modelDescription.textContent = hotspot.description || '';

    // Show modal
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    // Reset model viewer
    modelViewer.removeAttribute('src');
}

// Setup event listeners
function setupEventListeners() {
    prevBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderPage(state.currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (state.currentPage < state.totalPages) {
            state.currentPage++;
            renderPage(state.currentPage);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && state.currentPage > 1) {
            state.currentPage--;
            renderPage(state.currentPage);
        } else if (e.key === 'ArrowRight' && state.currentPage < state.totalPages) {
            state.currentPage++;
            renderPage(state.currentPage);
        } else if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderPage(state.currentPage);
        }, 250);
    });
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
