// Ref: https://mediatum.ub.tum.de/doc/1616020/b5oesenkgbt2lvf5r98ywiosv.ICMSAO19_Dynamic_CarPassenger_Matching_based_on_Tabu_SeRouteh_using_Global_Optimization_with_Time_Windows.pdf

interface Route {
  from: string
  to: string
  cost: number
}

interface Passenger {
  id: string
  pickUpLocation: string
  pickUpTime: number
}

interface DissatisfactionModel {
  piecewiseLinearDissatisfaction: (deltaT: number) => number
}

// Route
interface Solution {
  x: { [key: string]: { [key: string]: number } }
}

// List of cars, pickups and destinations
const C = ['C1', 'C2', 'C3']
const P = ['P1', 'P2', 'P3']
const D = ['D1', 'D2', 'D3']

const vertices = [...C, ...P, ...D]

// E.g.: 1 is valid route, else 0
const solutions: Solution = {
  x: {
    C1: {
      P1: 1,
      P2: 0,
      P3: 1,
      D1: 1,
      D2: 1,
      D3: 1
    },
    C2: {
      P1: 1,
      P2: 1,
      P3: 1,
      D1: 1,
      D2: 1,
      D3: 1
    },
    C3: {
      P1: 1,
      P2: 0,
      P3: 1,
      D1: 0,
      D2: 1,
      D3: 1
    }
  }
}

// Get all possible routes
const generateAllRoutes = (C: string[], P: string[], D: string[]): Route[] => {
  const allRoutes: Route[] = []

  // Add Routes from C to P
  C.forEach((c) => {
    P.forEach((p) => {
      const cost = 1 // The same cost
      allRoutes.push({ from: c, to: p, cost })
    })
  })

  // Add Routes from P to D
  P.forEach((p) => {
    D.forEach((d) => {
      const cost = 1
      allRoutes.push({ from: p, to: d, cost })
    })
  })

  // Add Routes from D to P
  D.forEach((d) => {
    P.forEach((p) => {
      const cost = 1
      allRoutes.push({ from: d, to: p, cost })
    })
  })

  return allRoutes
}

const allRoutes = generateAllRoutes(C, P, D)

const Passengers: Passenger[] = [
  { id: '1', pickUpLocation: 'P1', pickUpTime: 5 },
  { id: '2', pickUpLocation: 'P2', pickUpTime: 18 },
  { id: '3', pickUpLocation: 'P3', pickUpTime: 10 }
]

// Calculate penalty for let passenger waiting
const dissatisfactionModel: DissatisfactionModel = {
  piecewiseLinearDissatisfaction: (deltaT: number) => {
    if (deltaT <= 2) {
      return 0
    }

    const deltaTInSeconds = deltaT * 60

    const penalty =
      deltaT <= 5
        ? deltaTInSeconds * 60
        : deltaT <= 7
          ? deltaTInSeconds * 60 * 2
          : deltaTInSeconds * 60 * 4

    return penalty
  }
}

const calculateObjectiveFunction = (
  solution: Solution,
  Routes: Route[],
  Passengers: Passenger[]
): number => {
  // Operational cost
  const T1 = C.reduce((acc, v) => {
    return (
      acc +
      vertices.reduce((accA, a) => {
        return (
          accA +
          vertices.reduce((accB, b) => {
            const Route = Routes.find((Route) => Route.from === a && Route.to === b)
            const xValueA = solution.x[v][a]
            const xValueB = solution.x[v][b]
            const cost = Route ? Route.cost : 0

            if (xValueA !== undefined && xValueB !== undefined) {
              return accB + xValueA * xValueB * cost
            }

            return accB
          }, 0)
        )
      }, 0)
    )
  }, 0)

  // Penalty
  const T2 = P.reduce((acc, i) => {
    const Passenger = Passengers.find((c) => c.pickUpLocation === i)
    if (Passenger) {
      const deltaT = Passenger.pickUpTime
      return acc + dissatisfactionModel.piecewiseLinearDissatisfaction(deltaT)
    }
    return acc
  }, 0)

  return T1 + T2
}

// Get all neighborhood of a solution
function generateNeighborhood(currentSolution: Solution): Solution[] {
  const neighbors: Solution[] = []

  // Swap transformation
  neighbors.push(...generateSwapNeighbors(currentSolution))

  // Shift transformation
  neighbors.push(...generateShiftNeighbors(currentSolution))

  // Interchange transformation
  neighbors.push(...generateInterchangeNeighbors(currentSolution))

  return neighbors
}

// Switches requests within one car’s route
function generateSwapNeighbors(currentSolution: Solution): Solution[] {
  const swapNeighbors: Solution[] = []

  for (const carId of Object.keys(currentSolution.x)) {
    const pickupLocations = Object.keys(currentSolution.x[carId]).filter((loc) =>
      loc.startsWith('P')
    )

    for (let i = 0; i < pickupLocations.length - 1; i++) {
      for (let j = i + 1; j < pickupLocations.length; j++) {
        const neighbor = JSON.parse(JSON.stringify(currentSolution))
        const temp = neighbor.x[carId][pickupLocations[i]]
        neighbor.x[carId][pickupLocations[i]] = neighbor.x[carId][pickupLocations[j]]
        neighbor.x[carId][pickupLocations[j]] = temp
        swapNeighbors.push(neighbor)
      }
    }
  }

  return swapNeighbors
}

// Moves the last request of one car’s route to the end of another car’s route
function generateShiftNeighbors(currentSolution: Solution): Solution[] {
  const shiftNeighbors: Solution[] = []

  for (const carId1 of Object.keys(currentSolution.x)) {
    for (const carId2 of Object.keys(currentSolution.x)) {
      if (carId1 !== carId2) {
        const pickupLocations1 = Object.keys(currentSolution.x[carId1]).filter((loc) =>
          loc.startsWith('P')
        )

        const lastPickupInCar1 = pickupLocations1[pickupLocations1.length - 1]

        if (lastPickupInCar1) {
          const neighbor = JSON.parse(JSON.stringify(currentSolution))
          neighbor.x[carId1][lastPickupInCar1] = 0
          neighbor.x[carId2][lastPickupInCar1] = 1
          shiftNeighbors.push(neighbor)
        }
      }
    }
  }

  return shiftNeighbors
}

// transforms the solution by exchanging requests of two different cars’ routes
// Each car guaranteed to have atleast 1 pickup after interchange
function generateInterchangeNeighbors(currentSolution: Solution): Solution[] {
  const interchangeNeighbors: Solution[] = []

  for (const carId1 of Object.keys(currentSolution.x)) {
    for (const carId2 of Object.keys(currentSolution.x)) {
      if (carId1 !== carId2) {
        const pickupLocations1 = Object.keys(currentSolution.x[carId1]).filter((loc) =>
          loc.startsWith('P')
        )
        const pickupLocations2 = Object.keys(currentSolution.x[carId2]).filter((loc) =>
          loc.startsWith('P')
        )

        for (const loc1 of pickupLocations1) {
          for (const loc2 of pickupLocations2) {
            const neighbor = JSON.parse(JSON.stringify(currentSolution))
            const temp = neighbor.x[carId1][loc1]
            neighbor.x[carId1][loc1] = neighbor.x[carId2][loc2]
            neighbor.x[carId2][loc2] = temp

            // Check if each car still has at least one pickup after the interchange
            const car1PickupsRemaining = pickupLocations1.filter(
              (loc) => neighbor.x[carId1][loc] === 1
            )
            const car2PickupsRemaining = pickupLocations2.filter(
              (loc) => neighbor.x[carId2][loc] === 1
            )

            if (car1PickupsRemaining.length > 0 && car2PickupsRemaining.length > 0) {
              interchangeNeighbors.push(neighbor)
            }
          }
        }
      }
    }
  }

  return interchangeNeighbors
}

// Search best solution
const tabuSeRouteh = (
  initialSolution: Solution,
  Routes: Route[],
  Passengers: Passenger[],
  maxIterations: number = 100
): Solution => {
  let bestFoundSolution: Solution = initialSolution
  const tabuList: Solution[] = []
  let currentSolution: Solution = initialSolution

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    const neighbors = generateNeighborhood(currentSolution)

    let bestNeighbor: Solution | null = null

    // Evaluate neighbors and choose the best non-tabu neighbor
    for (const neighbor of neighbors) {
      if (!tabuList.includes(neighbor)) {
        const neighborObjective = calculateObjectiveFunction(neighbor, Routes, Passengers)
        const bestNeighborObjective = bestNeighbor
          ? calculateObjectiveFunction(bestNeighbor, Routes, Passengers)
          : Infinity

        if (neighborObjective < bestNeighborObjective) {
          bestNeighbor = neighbor
        }
      }
    }

    // Update the current solution and tabu list
    if (bestNeighbor) {
      currentSolution = bestNeighbor
      tabuList.push(bestNeighbor)

      // Keep the tabu list size at 10
      if (tabuList.length > 10) {
        tabuList.shift() // Remove the oldest entry
      }

      // Update if the new solution is better
      const currentObjective = calculateObjectiveFunction(currentSolution, Routes, Passengers)
      const bestObjective = calculateObjectiveFunction(bestFoundSolution, Routes, Passengers)

      if (currentObjective < bestObjective) {
        bestFoundSolution = currentSolution
      }
    } else {
      break
    }
  }

  return bestFoundSolution
}

// Test
const bestSolution = tabuSeRouteh(solutions, allRoutes, Passengers)
console.log('Best Solution:', bestSolution)
