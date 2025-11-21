export type Commitment = {
  id: string
  propertyCode: string
  propertyName: string
  location: string
  shares: number
  pricePerShare: number
  totalAmount: number
  committedAt: string
  closingDate: string
  status: "pending" | "in-escrow" | "completed"
}

const COMMITMENTS_KEY = "real-investment-commitments"

export function getCommitments(): Commitment[] {
  if (typeof window === "undefined") return []
  
  try {
    const data = localStorage.getItem(COMMITMENTS_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error reading commitments from localStorage:", error)
    return []
  }
}

export function saveCommitment(commitment: Omit<Commitment, "id" | "committedAt" | "status">): Commitment {
  const newCommitment: Commitment = {
    ...commitment,
    id: `commitment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    committedAt: new Date().toISOString(),
    status: "pending"
  }

  const commitments = getCommitments()
  commitments.push(newCommitment)
  
  try {
    localStorage.setItem(COMMITMENTS_KEY, JSON.stringify(commitments))
  } catch (error) {
    console.error("Error saving commitment to localStorage:", error)
  }

  return newCommitment
}

export function updateCommitmentStatus(id: string, status: Commitment["status"]) {
  const commitments = getCommitments()
  const updated = commitments.map(c => 
    c.id === id ? { ...c, status } : c
  )
  
  try {
    localStorage.setItem(COMMITMENTS_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error("Error updating commitment status:", error)
  }
}

export function getTotalCommitted(): number {
  const commitments = getCommitments()
  return commitments.reduce((sum, c) => sum + c.totalAmount, 0)
}

export function getCommitmentsByStatus(status: Commitment["status"]): Commitment[] {
  return getCommitments().filter(c => c.status === status)
}

