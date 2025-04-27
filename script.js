let bars = [];
let isPaused = false;
let speed = 300;

// Generate random bars
function generateBars() {
  const barContainer = document.getElementById("bar-container");
  barContainer.innerHTML = ""; // Clear existing bars
  bars = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);

  bars.forEach((value) => {
    const bar = document.createElement("div");
    bar.style.height = `${value * 3}px`;
    bar.style.width = "20px";
    bar.style.backgroundColor = "#007BFF";
    bar.setAttribute("data-value", value); // Set the value as a data attribute
    barContainer.appendChild(bar);
  });
}

// Generate bars from user input
function generateBarsFromInput() {
  const input = document.getElementById("arrayInput").value;
  const values = input.split(",").map(Number).filter((n) => !isNaN(n)); // Parse input and filter invalid numbers

  if (values.length === 0) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  const barContainer = document.getElementById("bar-container");

  // Clear the container
  barContainer.innerHTML = "";

  // Update the global `bars` array
  bars = values;

  // Generate bars
  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar"); // Add bar styling
    bar.style.height = `${value * 3}px`;
    bar.setAttribute("data-value", value);
    barContainer.appendChild(bar);
  });
}

function generateArray() {
  const input = document.getElementById("arrayInput").value;
  const values = input.split(",").map((num) => parseInt(num.trim())).filter((num) => !isNaN(num)); // Parse and clean input

  if (values.length === 0) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  const barContainer = document.getElementById("bar-container");

  // Clear the container
  barContainer.innerHTML = "";

  // Update the global `bars` array
  bars = values;

  // Generate array blocks
  values.forEach((value) => {
    const block = document.createElement("div");
    block.classList.add("block"); // Add block styling
    block.textContent = value; // Set the value as text
    barContainer.appendChild(block);
  });
}

// Update speed value
function updateSpeedValue() {
  const sliderValue = document.getElementById("speedRange").value;
  speed = 1000 - sliderValue; // Reverse the speed logic
  document.getElementById("speedValue").textContent = sliderValue; // Display the slider value
}

// Pause sorting
function pauseSorting() {
  isPaused = true;
}

// Resume sorting
function resumeSorting() {
  isPaused = false;
}

function showComplexityInfo(algorithm) {
  const timeComplexity = document.getElementById("time-complexity");
  const spaceComplexity = document.getElementById("space-complexity");

  switch (algorithm) {
    case "bubbleSort":
      timeComplexity.textContent = "Best: O(n), Average: O(n²), Worst: O(n²)";
      spaceComplexity.textContent = "O(1)";
      break;
    case "selectionSort":
      timeComplexity.textContent = "Best: O(n²), Average: O(n²), Worst: O(n²)";
      spaceComplexity.textContent = "O(1)";
      break;
    case "insertionSort":
      timeComplexity.textContent = "Best: O(n), Average: O(n²), Worst: O(n²)";
      spaceComplexity.textContent = "O(1)";
      break;
    case "mergeSort":
      timeComplexity.textContent = "Best: O(n log n), Average: O(n log n), Worst: O(n log n)";
      spaceComplexity.textContent = "O(n)";
      break;
    case "quickSort":
      timeComplexity.textContent = "Best: O(n log n), Average: O(n log n), Worst: O(n²)";
      spaceComplexity.textContent = "O(log n)";
      break;
    default:
      timeComplexity.textContent = "-";
      spaceComplexity.textContent = "-";
  }
}

function zoomInBars() {
  const barContainer = document.getElementById("bar-container");
  const bars = barContainer.children;

  for (let bar of bars) {
    const currentWidth = parseFloat(window.getComputedStyle(bar).width);
    const currentHeight = parseFloat(window.getComputedStyle(bar).height);

    // Increase bar width and height
    bar.style.width = `${currentWidth + 2}px`;
    bar.style.height = `${currentHeight * 1.1}px`; // Increase height by 10%
  }
}

function zoomOutBars() {
  const barContainer = document.getElementById("bar-container");
  const bars = barContainer.children;

  for (let bar of bars) {
    const currentWidth = parseFloat(window.getComputedStyle(bar).width);
    const currentHeight = parseFloat(window.getComputedStyle(bar).height);

    // Decrease bar width and height, ensuring minimum width and height
    if (currentWidth > 5) {
      bar.style.width = `${currentWidth - 2}px`;
    }
    if (currentHeight > 10) {
      bar.style.height = `${currentHeight * 0.9}px`; // Decrease height by 10%
    }
  }
}

// Bubble Sort
async function bubbleSort() {
  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (isPaused) await waitForResume();

      // Highlight the bars being compared
      barElements[j].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color
      barElements[j + 1].style.background = "linear-gradient(135deg, #FF5722, #FFC107)";

      if (bars[j] > bars[j + 1]) {
        // Swap bars
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        barElements[j].style.height = `${bars[j] * 3}px`;
        barElements[j + 1].style.height = `${bars[j + 1] * 3}px`;
        barElements[j].setAttribute("data-value", bars[j]);
        barElements[j + 1].setAttribute("data-value", bars[j + 1]);
      }

      await sleep(speed);

      // Reset the color after comparison
      barElements[j].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
      barElements[j + 1].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)";
    }

    // Mark the last sorted bar
    barElements[bars.length - i - 1].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color
  }

  // Mark all bars as sorted
  for (let k = 0; k < bars.length; k++) {
    barElements[k].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Final sorted color
  }

  showComplexityInfo("bubbleSort");
}

// Selection Sort
async function selectionSort() {
  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;

    // Highlight the current minimum bar
    barElements[minIndex].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color

    for (let j = i + 1; j < bars.length; j++) {
      if (isPaused) await waitForResume();

      // Highlight the bar being compared
      barElements[j].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color

      if (bars[j] < bars[minIndex]) {
        // Reset the previous minimum bar's color
        barElements[minIndex].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
        minIndex = j;

        // Highlight the new minimum bar
        barElements[minIndex].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color
      }

      await sleep(speed);

      // Reset the color of the compared bar
      if (j !== minIndex) {
        barElements[j].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
      }
    }

    if (minIndex !== i) {
      // Swap bars
      [bars[i], bars[minIndex]] = [bars[minIndex], bars[i]];
      barElements[i].style.height = `${bars[i] * 3}px`;
      barElements[minIndex].style.height = `${bars[minIndex] * 3}px`;
      barElements[i].setAttribute("data-value", bars[i]);
      barElements[minIndex].setAttribute("data-value", bars[minIndex]);
    }

    // Mark the sorted bar
    barElements[i].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color
  }

  // Mark all bars as sorted
  for (let k = 0; k < bars.length; k++) {
    barElements[k].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Final sorted color
  }
  showComplexityInfo("selectionSort");
}

//Insertion Sort
async function insertionSort() {
  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  for (let i = 1; i < bars.length; i++) {
    let key = bars[i];
    let j = i - 1;

    // Highlight the current key bar
    barElements[i].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color

    await sleep(speed);

    while (j >= 0 && bars[j] > key) {
      if (isPaused) await waitForResume();

      // Highlight the bar being compared
      barElements[j].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color

      // Move the bar one position ahead
      bars[j + 1] = bars[j];
      barElements[j + 1].style.height = `${bars[j] * 3}px`;
      barElements[j + 1].setAttribute("data-value", bars[j]);

      await sleep(speed);

      // Reset the color of the compared bar
      barElements[j].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color

      j--;
    }

    // Place the key in its correct position
    bars[j + 1] = key;
    barElements[j + 1].style.height = `${key * 3}px`;
    barElements[j + 1].setAttribute("data-value", key);

    // Mark the sorted portion
    for (let k = 0; k <= i; k++) {
      barElements[k].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color
    }
  }

  // Mark all bars as sorted
  for (let k = 0; k < bars.length; k++) {
    barElements[k].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Final sorted color
  }
  showComplexityInfo("insertionSort");
}

// Merge Sort

async function mergeSort(start, end) {
  if (start >= end) return; // Base case: single element or invalid range

  const mid = Math.floor((start + end) / 2);

  // Recursively divide the array
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);

  // Merge the divided arrays
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  const temp = [];
  let i = start, j = mid + 1;

  // Highlight the range being merged
  for (let k = start; k <= end; k++) {
    barElements[k].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Hover color
  }

  await sleep(speed);

  // Merge the two halves
  while (i <= mid && j <= end) {
    if (isPaused) await waitForResume();

    if (bars[i] <= bars[j]) {
      temp.push(bars[i]);
      i++;
    } else {
      temp.push(bars[j]);
      j++;
    }
  }

  // Add remaining elements from the left half
  while (i <= mid) {
    temp.push(bars[i]);
    i++;
  }

  // Add remaining elements from the right half
  while (j <= end) {
    temp.push(bars[j]);
    j++;
  }

  // Copy the sorted values back to the original array
  for (let k = start; k <= end; k++) {
    bars[k] = temp[k - start];
    barElements[k].style.height = `${bars[k] * 3}px`;
    barElements[k].setAttribute("data-value", bars[k]);

    // Highlight the sorted bars
    barElements[k].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color

    await sleep(speed);
  }
  if (start === 0 && end === bars.length - 1) {
    showComplexityInfo("mergeSort");
  }
}

// Quick Sort
async function quickSort(start, end) {
  if (start >= end) return;

  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  const pivotIndex = await partition(start, end, barElements);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);

  // Show complexity info after sorting is complete
  if (start === 0 && end === bars.length - 1) {
    showComplexityInfo("quickSort");
  }
}

async function partition(start, end, barElements) {
  const pivotValue = bars[end];
  let pivotIndex = start;

  // Highlight the pivot bar
  barElements[end].style.background = "linear-gradient(135deg,rgb(229, 237, 73),rgb(125, 121, 106))"; // Pivot color

  for (let i = start; i < end; i++) {
    if (isPaused) await waitForResume();

    // Highlight the current bar being compared
    barElements[i].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Comparison color

    if (bars[i] < pivotValue) {
      // Swap bars
      [bars[i], bars[pivotIndex]] = [bars[pivotIndex], bars[i]];
      barElements[i].style.height = `${bars[i] * 3}px`;
      barElements[pivotIndex].style.height = `${bars[pivotIndex] * 3}px`;
      barElements[i].setAttribute("data-value", bars[i]);
      barElements[pivotIndex].setAttribute("data-value", bars[pivotIndex]);
      pivotIndex++;
    }

    await sleep(speed);

    // Reset the color of the compared bar
    barElements[i].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
  }

  // Swap the pivot to its correct position
  [bars[pivotIndex], bars[end]] = [bars[end], bars[pivotIndex]];
  barElements[pivotIndex].style.height = `${bars[pivotIndex] * 3}px`;
  barElements[end].style.height = `${bars[end] * 3}px`;
  barElements[pivotIndex].setAttribute("data-value", bars[pivotIndex]);
  barElements[end].setAttribute("data-value", bars[end]);

  // Reset the pivot bar color and mark it as sorted
  barElements[end].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Reset pivot color
  barElements[pivotIndex].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color

  return pivotIndex;
}

// Utility function to sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Wait for resume
function waitForResume() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (!isPaused) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

// Start Sorting
function startSorting() {
  const algorithm = document.getElementById("algorithmSelect").value;
  switch (algorithm) {
    case "bubbleSort":
      bubbleSort();
      break;
    case "selectionSort":
      selectionSort();
      break;
    case "quickSort":
      quickSort(0, bars.length - 1);
      break;
    default:
      alert("Please select a valid sorting algorithm.");
  }
}

async function startSorting() {
  const algorithm = document.getElementById("algorithmSelect").value;
  displayComplexity(algorithm); // Display complexity before starting the algorithm

  switch (algorithm) {
    case "bubbleSort":
      await bubbleSort();
      break;
    case "selectionSort":
      await selectionSort();
      break;
    case "insertionSort":
      await insertionSort();
      break;
    case "mergeSort":
      await mergeSort(0, bars.length - 1);
      break;
    case "quickSort":
      await quickSort(0, bars.length - 1);
      break;
    default:
      alert("Please select a valid sorting algorithm.");
      return;
  }

  // Show complexity info after sorting is completed
  showComplexityInfo(algorithm);
}

async function heapSort() {
  const barContainer = document.getElementById("bar-container");
  const barElements = barContainer.children;

  const n = bars.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i, barElements, true); // Pass `true` to visualize heap building
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap the root (largest element) with the last element
    [bars[0], bars[i]] = [bars[i], bars[0]];
    barElements[0].style.height = `${bars[0] * 3}px`;
    barElements[i].style.height = `${bars[i] * 3}px`;
    barElements[0].setAttribute("data-value", bars[0]);
    barElements[i].setAttribute("data-value", bars[i]);

    // Highlight the sorted bar
    barElements[i].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Sorted color

    await sleep(speed);

    // Heapify the reduced heap
    await heapify(i, 0, barElements, false); // Pass `false` to skip heap visualization
  }

  // Mark the last remaining bar as sorted
  barElements[0].style.background = "linear-gradient(135deg, #4CAF50, #81C784)"; // Final sorted color

  // Show complexity info after sorting is complete
  showComplexityInfo("heapSort");
}

async function heapify(n, i, barElements, visualizeHeap) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  // Highlight the current root
  if (visualizeHeap) {
    barElements[i].style.background = "linear-gradient(135deg, #FF9800, #FFC107)"; // Heap-building color
  }

  // Check if the left child is larger than the root
  if (left < n && bars[left] > bars[largest]) {
    largest = left;
  }

  // Check if the right child is larger than the largest so far
  if (right < n && bars[right] > bars[largest]) {
    largest = right;
  }

  // If the largest is not the root, swap and heapify the affected subtree
  if (largest !== i) {
    // Highlight the bars being swapped
    barElements[largest].style.background = "linear-gradient(135deg, #FF5722, #FFC107)"; // Comparison color

    // Swap bars
    [bars[i], bars[largest]] = [bars[largest], bars[i]];
    barElements[i].style.height = `${bars[i] * 3}px`;
    barElements[largest].style.height = `${bars[largest] * 3}px`;
    barElements[i].setAttribute("data-value", bars[i]);
    barElements[largest].setAttribute("data-value", bars[largest]);

    await sleep(speed);

    // Reset the color of the swapped bars
    barElements[largest].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
    barElements[i].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color

    // Recursively heapify the affected subtree
    await heapify(n, largest, barElements, visualizeHeap);
  } else if (visualizeHeap) {
    // Reset the color of the root if no swap occurred
    barElements[i].style.background = "linear-gradient(135deg, #007BFF, #00C6FF)"; // Original color
  }
}






// Initialize
generateBars();