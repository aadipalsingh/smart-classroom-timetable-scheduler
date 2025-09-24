import { useState } from "react"
import { Lightbulb, CheckCircle, AlertTriangle, TrendingUp, Clock, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Suggestion {
  id: string
  type: 'optimization' | 'conflict' | 'resource' | 'schedule'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  status: 'pending' | 'applied' | 'dismissed'
  createdAt: string
}

export default function Suggestions() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'applied'>('all')
  
  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "optimization",
      title: "Optimize Morning Schedule Distribution",
      description: "Consider redistributing heavy subjects across morning slots to balance student workload. Currently, 3 major subjects are scheduled consecutively in Block A.",
      impact: "high",
      status: "pending",
      createdAt: "2024-03-15"
    }
  ])

  const filteredSuggestions = suggestions.filter(suggestion => 
    filter === 'all' || suggestion.status === filter
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-5 w-5" />
      case 'conflict': return <AlertTriangle className="h-5 w-5" />
      case 'resource': return <Building className="h-5 w-5" />
      case 'schedule': return <Clock className="h-5 w-5" />
      default: return <Lightbulb className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-blue-600 bg-blue-50'
      case 'conflict': return 'text-red-600 bg-red-50'
      case 'resource': return 'text-green-600 bg-green-50'
      case 'schedule': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'applied': return 'bg-green-100 text-green-800'
      case 'dismissed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Suggestions</h1>
        <p className="text-gray-600">
          Smart recommendations to optimize your timetable and resolve conflicts.
        </p>
      </div>

      {/* Stats and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">
              {suggestions.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {suggestions.filter(s => s.status === 'applied').length}
            </div>
            <div className="text-sm text-green-600">Applied</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{suggestions.length}</div>
            <div className="text-sm text-blue-600">Total</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            size="sm"
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'applied' ? 'default' : 'outline'}
            onClick={() => setFilter('applied')}
            size="sm"
          >
            Applied
          </Button>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getTypeColor(suggestion.type)}`}>
                {getTypeIcon(suggestion.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{suggestion.title}</h3>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                      {suggestion.impact} impact
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                      {suggestion.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{suggestion.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Suggested on {new Date(suggestion.createdAt).toLocaleDateString()}
                  </div>
                  
                  {suggestion.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50">
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Lightbulb className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
          <p className="text-sm">AI will analyze your timetable and provide optimization suggestions</p>
        </div>
      )}
    </div>
  )
}