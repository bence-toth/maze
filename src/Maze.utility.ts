// Interface representing each cell in the maze
export interface Cell {
  x: number; // X-coordinate of the cell
  y: number; // Y-coordinate of the cell
  hasWallTop: boolean; // Indicates if the cell has a top wall
  hasWallRight: boolean; // Indicates if the cell has a right wall
  hasWallBottom: boolean; // Indicates if the cell has a bottom wall
  hasWallLeft: boolean; // Indicates if the cell has a left wall
  hasFood: boolean; // Indicates if the cell contains food
}

// Function to initialize the maze grid with all walls intact
const initializeMaze = (width: number, height: number): Cell[][] =>
  Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      x,
      y,
      hasWallTop: true,
      hasWallRight: true,
      hasWallBottom: true,
      hasWallLeft: true,
      hasFood: false,
    }))
  );

// Function to get the unvisited neighboring cells of the current cell
const getUnvisitedNeighbors = (
  cell: { x: number; y: number },
  maze: Cell[][],
  visited: boolean[][]
): { x: number; y: number }[] => {
  const { x, y } = cell;
  const neighbors: { x: number; y: number }[] = [];

  // Check the cell above (top neighbor)
  if (y > 0 && !visited[y - 1][x]) neighbors.push({ x, y: y - 1 });
  // Check the cell to the right (right neighbor)
  if (x < maze[0].length - 1 && !visited[y][x + 1])
    neighbors.push({ x: x + 1, y });
  // Check the cell below (bottom neighbor)
  if (y < maze.length - 1 && !visited[y + 1][x])
    neighbors.push({ x, y: y + 1 });
  // Check the cell to the left (left neighbor)
  if (x > 0 && !visited[y][x - 1]) neighbors.push({ x: x - 1, y });

  return neighbors;
};

// Function to remove walls between the current cell and the next cell
const removeWalls = (
  current: { x: number; y: number },
  next: { x: number; y: number },
  maze: Cell[][]
) => {
  const xDiff = current.x - next.x;
  const yDiff = current.y - next.y;

  if (xDiff === 1) {
    // Next cell is to the left of current cell
    maze[current.y][current.x].hasWallLeft = false;
    maze[next.y][next.x].hasWallRight = false;
  } else if (xDiff === -1) {
    // Next cell is to the right of current cell
    maze[current.y][current.x].hasWallRight = false;
    maze[next.y][next.x].hasWallLeft = false;
  }

  if (yDiff === 1) {
    // Next cell is above the current cell
    maze[current.y][current.x].hasWallTop = false;
    maze[next.y][next.x].hasWallBottom = false;
  } else if (yDiff === -1) {
    // Next cell is below the current cell
    maze[current.y][current.x].hasWallBottom = false;
    maze[next.y][next.x].hasWallTop = false;
  }
};

// Function to set the start and finish points by removing the walls at those cells
const setStartAndFinish = (
  maze: Cell[][],
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const width = maze[0].length;
  const height = maze.length;

  // Remove wall for the starting cell
  if (start.y === 0) {
    // Start cell is on the top edge
    maze[start.y][start.x].hasWallTop = true;
  } else if (start.y === height - 1) {
    // Start cell is on the bottom edge
    maze[start.y][start.x].hasWallBottom = false;
  } else if (start.x === 0) {
    // Start cell is on the left edge
    maze[start.y][start.x].hasWallLeft = false;
  } else if (start.x === width - 1) {
    // Start cell is on the right edge
    maze[start.y][start.x].hasWallRight = false;
  } else {
    throw new Error("Start cell must be on the border of the maze");
  }

  // Remove wall for the ending cell
  if (end.y === 0) {
    // End cell is on the top edge
    maze[end.y][end.x].hasWallTop = false;
  } else if (end.y === height - 1) {
    // End cell is on the bottom edge
    maze[end.y][end.x].hasWallBottom = false;
  } else if (end.x === 0) {
    // End cell is on the left edge
    maze[end.y][end.x].hasWallLeft = false;
  } else if (end.x === width - 1) {
    // End cell is on the right edge
    maze[end.y][end.x].hasWallRight = false;
  } else {
    throw new Error("End cell must be on the border of the maze");
  }

  return maze;
};

// Function to place food on 5 random cells excluding the start and end cells
const placeFood = (
  maze: Cell[][],
  start: { x: number; y: number },
  end: { x: number; y: number },
  foodCount: number = 5
) => {
  const width = maze[0].length;
  const height = maze.length;

  // We'll use a Set to keep track of cells we can't place food on
  const excludedCells = new Set<string>();
  excludedCells.add(`${start.x},${start.y}`);
  excludedCells.add(`${end.x},${end.y}`);

  let placed = 0;
  while (placed < foodCount) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    const key = `${randomX},${randomY}`;

    // Check if this cell is neither start nor end and not already chosen
    if (!excludedCells.has(key)) {
      excludedCells.add(key);
      maze[randomY][randomX].hasFood = true;
      placed++;
    }
  }

  return maze;
};

// Function to generate the maze using depth-first search algorithm
const generateMaze = (
  width: number,
  height: number,
  start: { x: number; y: number } = { x: 0, y: 0 },
  end: { x: number; y: number } = { x: width - 1, y: height - 1 }
): Cell[][] => {
  // Initialize the maze grid
  const maze = initializeMaze(width, height);

  // Stack to keep track of the path
  const stack: { x: number; y: number }[] = [];

  // 2D array to keep track of visited cells
  const visited = Array.from({ length: height }, () =>
    Array(width).fill(false)
  );

  // Start from the starting cell
  let currentCell = { x: start.x, y: start.y };
  visited[currentCell.y][currentCell.x] = true;

  while (true) {
    // Get all unvisited neighbors of the current cell
    const neighbors = getUnvisitedNeighbors(currentCell, maze, visited);

    if (neighbors.length > 0) {
      // Randomly choose one of the unvisited neighbors
      const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Push the current cell to the stack
      stack.push(currentCell);

      // Remove the wall between the current cell and the chosen cell
      removeWalls(currentCell, nextCell, maze);

      // Move to the chosen cell and mark it as visited
      currentCell = nextCell;
      visited[currentCell.y][currentCell.x] = true;
    } else if (stack.length > 0) {
      // Backtrack to the previous cell if there are no unvisited neighbors
      currentCell = stack.pop()!;
    } else {
      // Exit the loop when there are no more cells to visit
      break;
    }
  }

  // Set the start and finish points
  return placeFood(setStartAndFinish(maze, start, end), start, end, 10);
};

export { generateMaze };
