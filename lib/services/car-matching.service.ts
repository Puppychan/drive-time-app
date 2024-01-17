// Interfaces
interface mLocation {
  id: string
  x: number
  y: number
}

interface CarRequest {
  pickup: mLocation
  delivery: mLocation
}

interface DriverMetrics {
  id: string
  totalIncomeToday: number
  totalDistanceTraveled: number
}

interface Arc {
  from: string
  to: string
  cost: number
  waitTime: number
  loadBalanceScore: number
}

interface Car {
  id: string
  mLocation: mLocation
}

interface Solution {
  x: { [carId: string]: { [mLocationId: string]: number } }
}

// Get all routes
function generateAllArcs(locations: mLocation[]): Arc[] {
  const arcs: Arc[] = []

  // Filter out arcs only between customer locations (C) and pickup locations (P)
  const customerLocations = locations.filter((loc) => loc.id.startsWith('C'))
  const pickupLocations = locations.filter((loc) => loc.id.startsWith('P'))

  for (const fromLocation of customerLocations) {
    for (const toLocation of pickupLocations) {
      const cost = Math.floor(Math.random() * 10) + 1
      const waitingTime = Math.floor(Math.random() * 10) + 1

      const driverMetrics = driverMetricsArray.find((metrics) => metrics.id === fromLocation.id)
      const loadBalanceScore = driverMetrics ? calculateLoadBalanceScore(driverMetrics) : 0

      arcs.push({
        from: fromLocation.id,
        to: toLocation.id,
        cost,
        waitTime: waitingTime,
        loadBalanceScore
      })
    }
  }

  return arcs
}

// Convert Request and car location to single Location
function generateLocations(cars: Car[], requests: CarRequest[]): mLocation[] {
  const locations: mLocation[] = []

  // Add pickup and delivery locations
  requests.forEach((request) => {
    locations.push(request.pickup, request.delivery)
  })

  // Add car locations
  cars.forEach((car) => {
    locations.push(car.mLocation)
  })

  // Remove duplicate locations based on ID
  const uniqueLocations = Array.from(new Set(locations.map((loc) => loc.id)))
    .map((id) => locations.find((loc) => loc.id === id)!)
    .filter(Boolean)

  return uniqueLocations
}

// Following NNP algorithm
function generateInitialSolution(cars: Car[], requests: CarRequest[], allArcs: Arc[]): Solution {
  const solution: Solution = { x: {} }

  cars.forEach((car) => {
    solution.x[car.id] = {}
  })

  requests.forEach((request) => {
    const nearestCar = findNearestCar(request.pickup, cars, allArcs, solution)

    if (nearestCar) {
      const { id: carId } = nearestCar
      // Check if the car has available capacity
      if (Object.keys(solution.x[carId]).length === 0) {
        solution.x[carId][request.pickup.id] = 1
        solution.x[carId][request.delivery.id] = 1
      } else {
        // Skip this request if the car already has a request assigned
        console.warn(`Skipping request ${request.pickup.id} as car ${carId} is already assigned`)
      }
    } else {
      throw new Error('Not enough cars to fulfill requests')
    }
  })

  return solution
}

function findNearestCar(
  pickupLocation: mLocation,
  cars: Car[],
  allArcs: Arc[],
  solution: Solution
): Car | null {
  let nearestCar: Car | null = null
  let nearestDistance = Infinity

  for (const car of cars) {
    // Only consider cars without existing requests
    if (Object.keys(solution.x[car.id]).length === 0) {
      const arc = allArcs.find((a) => a.from === car.mLocation.id && a.to === pickupLocation.id)

      if (arc && arc.cost < nearestDistance) {
        nearestCar = car
        nearestDistance = arc.cost
      }
    }
  }

  return nearestCar
}

//Calculate time penalty
function calculatePiecewiseLinearDissatisfaction(waitingTime: number) {
  if (waitingTime <= 2) {
    return 0
  }

  const deltaTInSeconds = waitingTime * 60

  const penalty =
    waitingTime <= 5
      ? deltaTInSeconds * 60
      : waitingTime <= 7
        ? deltaTInSeconds * 60 * 2
        : deltaTInSeconds * 60 * 4

  return penalty
}

function calculateLoadBalanceScore(driverMetrics: DriverMetrics): number {
  const incomeWeight = 0.6
  const distanceWeight = 0.4

  const normalizedIncome = driverMetrics.totalIncomeToday / 1000
  const normalizedDistance = driverMetrics.totalDistanceTraveled / 100

  // Combine income and distance metrics with weights
  const score = incomeWeight * normalizedIncome + distanceWeight * normalizedDistance

  return Math.abs(1 - score) * 100
}

const calculateObjectiveFunction = (
  solution: Solution,
  arcs: Arc[],
  requests: CarRequest[]
): number => {
  // T1 calculation (Operational cost)
  const operationalCost = Object.keys(solution.x).reduce((accCar, carId) => {
    const car = solution.x[carId]

    const carCost = Object.keys(car).reduce((accLocation, locationId) => {
      const location = car[locationId]
      // Check if it's a pickup location
      if (location === 1 && locationId.startsWith('P')) {
        // Find the corresponding arc cost
        const arc = arcs.find((route) => route.from === carId && route.to === locationId)

        if (arc) {
          return accLocation + arc.cost
        }
      }

      return accLocation
    }, 0)

    return accCar + carCost
  }, 0)

  // T2 calculation (Penalty)
  const penalty = arcs.reduce((acc, arc) => {
    const deltaT = arc.waitTime
    return acc + calculatePiecewiseLinearDissatisfaction(deltaT)
  }, 0)

  // T3 calculation (Load balancer)
  const loadBalanceScore = arcs.reduce((acc, arc) => acc + arc.loadBalanceScore, 0)

  return operationalCost + penalty + loadBalanceScore
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

// shift moves the last request of one car’s route to the end of another car’s route
// Each car guaranteed to have atleast 1 pickup after shift
function generateShiftNeighbors(currentSolution: Solution): Solution[] {
  const shiftNeighbors: Solution[] = []

  for (const carId1 of Object.keys(currentSolution.x)) {
    for (const carId2 of Object.keys(currentSolution.x)) {
      if (carId1 !== carId2) {
        const pickupLocations1 = Object.keys(currentSolution.x[carId1]).filter((loc) =>
          loc.startsWith('P')
        )

        const lastPickupInCar1 = pickupLocations1[pickupLocations1.length - 1]

        // Check if there's more than one pickup location in carId1
        if (lastPickupInCar1 && pickupLocations1.length > 1) {
          const neighbor = JSON.parse(JSON.stringify(currentSolution))
          neighbor.x[carId1][lastPickupInCar1] = 0
          neighbor.x[carId2][lastPickupInCar1] = 1

          // Check if each car still has at least one pickup after the shift
          const car1PickupsRemaining = pickupLocations1.filter(
            (loc) => neighbor.x[carId1][loc] === 1
          )
          const car2PickupsRemaining = Object.keys(neighbor.x[carId2]).filter(
            (loc) => loc.startsWith('P') && neighbor.x[carId2][loc] === 1
          )

          if (car1PickupsRemaining.length <= 1 && car2PickupsRemaining.length <= 1) {
            shiftNeighbors.push(neighbor)
          }
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

            if (car1PickupsRemaining.length <= 1 && car2PickupsRemaining.length <= 1) {
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
const tabuSearchRoute = (
  initialSolution: Solution,
  Routes: Arc[],
  Request: CarRequest[],
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
        const neighborObjective = calculateObjectiveFunction(neighbor, Routes, Request)
        const bestNeighborObjective = bestNeighbor
          ? calculateObjectiveFunction(bestNeighbor, Routes, Request)
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
      const currentObjective = calculateObjectiveFunction(currentSolution, Routes, Request)
      const bestObjective = calculateObjectiveFunction(bestFoundSolution, Routes, Request)

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
const cars: Car[] = [
  { id: 'C1', mLocation: { id: 'C1', x: 0, y: 0 } },
  { id: 'C2', mLocation: { id: 'C2', x: 1, y: 2 } },
  { id: 'C3', mLocation: { id: 'C3', x: 0, y: 2 } },
  { id: 'C4', mLocation: { id: 'C4', x: 0, y: 2 } }
]

const driverMetricsArray: DriverMetrics[] = [
  { id: 'C1', totalIncomeToday: 800, totalDistanceTraveled: 120 },
  { id: 'C2', totalIncomeToday: 1000, totalDistanceTraveled: 150 },
  { id: 'C3', totalIncomeToday: 1200, totalDistanceTraveled: 90 },
  { id: 'C4', totalIncomeToday: 500, totalDistanceTraveled: 180 }
]

const requests: CarRequest[] = [
  { pickup: { id: 'P1', x: 2, y: 2 }, delivery: { id: 'D1', x: 3, y: 3 } },
  { pickup: { id: 'P2', x: 3, y: 3 }, delivery: { id: 'D2', x: 4, y: 4 } },
  { pickup: { id: 'P3', x: 1, y: 1 }, delivery: { id: 'D3', x: 4, y: 4 } }
]

const locations = generateLocations(cars, requests)
const arcs = generateAllArcs(locations)
const initialSolution = generateInitialSolution(cars, requests, arcs)

// Test
const bestSolution = tabuSearchRoute(initialSolution, arcs, requests)
console.log('Best Solution:', bestSolution)
