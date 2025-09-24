import { useState } from "react"
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  Filter,
  Search,
  Zap,
  Target,
  Brain
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { mockSuggestions, type Suggestion } from "@/data/mockData"

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedImpact, setSelectedImpact] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Filter suggestions
  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || suggestion.type === selectedType
    const matchesImpact = selectedImpact === "all" || suggestion.impact === selectedImpact
    const matchesStatus = selectedStatus === "all" || suggestion.status === selectedStatus
    
    return matchesSearch && matchesType && matchesImpact && matchesStatus
  })

  const handleApplySuggestion = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, status: 'applied' } : s
    ))
    toast({
      title: "Suggestion Applied",
      description: "The suggestion has been successfully implemented.",
    })
  }

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, status: 'rejected' } : s
    ))
    toast({
      title: "Suggestion Rejected", 
      description: "The suggestion has been marked as rejected.",
    })
  }

  const getTypeIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'conflict_resolution':
        return <AlertTriangle className="h-4 w-4" />
      case 'optimization':
        return <TrendingUp className="h-4 w-4" />
      case 'faculty_leave':
        return <Users className="h-4 w-4" />
      case 'room_change':
        return <MapPin className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getImpactBadge = (impact: Suggestion['impact']) => {
    switch (impact) {
      case 'high':
        return <Badge variant="destructive">High Impact</Badge>
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium Impact</Badge>
      case 'low':
        return <Badge variant="secondary">Low Impact</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: Suggestion['status']) => {
    switch (status) {
      case 'applied':
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Applied</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'rejected':
        return <Badge variant="outline">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeLabel = (type: Suggestion['type']) => {
    switch (type) {
      case 'conflict_resolution':
        return 'Conflict Resolution'
      case 'optimization':
        return 'Optimization'
      case 'faculty_leave':
        return 'Faculty Leave'
      case 'room_change':
        return 'Room Change'
      default:
        return 'General'
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Suggestions</h1>
        <p className="text-muted-foreground">
          Intelligent recommendations for schedule optimization and conflict resolution
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Suggestions</p>
                <p className="text-2xl font-bold">{suggestions.length}</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {suggestions.filter(s => s.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applied</p>
                <p className="text-2xl font-bold text-success">
                  {suggestions.filter(s => s.status === 'applied').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">
                  {suggestions.filter(s => s.impact === 'high').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Suggestions</TabsTrigger>
          <TabsTrigger value="conflict_resolution">Conflicts</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="faculty_leave">Faculty</TabsTrigger>
          <TabsTrigger value="room_change">Rooms</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suggestions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Impacts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impacts</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {getTypeLabel(suggestion.type)} • {suggestion.createdAt}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getImpactBadge(suggestion.impact)}
                    {getStatusBadge(suggestion.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{suggestion.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>Affects {suggestion.affectedClasses} classes</span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Recommended Action:</p>
                  <p className="text-sm text-muted-foreground">{suggestion.recommendation}</p>
                </div>
                
                {suggestion.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleApplySuggestion(suggestion.id)}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Apply Suggestion
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleRejectSuggestion(suggestion.id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Individual category tabs */}
        {['conflict_resolution', 'optimization', 'faculty_leave', 'room_change'].map(type => (
          <TabsContent key={type} value={type} className="space-y-4">
            {filteredSuggestions
              .filter(s => s.type === type)
              .map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getTypeIcon(suggestion.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {suggestion.createdAt}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getImpactBadge(suggestion.impact)}
                        {getStatusBadge(suggestion.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{suggestion.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>Affects {suggestion.affectedClasses} classes</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Recommended Action:</p>
                      <p className="text-sm text-muted-foreground">{suggestion.recommendation}</p>
                    </div>
                    
                    {suggestion.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          onClick={() => handleApplySuggestion(suggestion.id)}
                          className="bg-success hover:bg-success/90 text-success-foreground"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Apply Suggestion
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}