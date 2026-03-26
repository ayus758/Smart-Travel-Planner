#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> pii; // (cost, node)

const int INF = 1e9;

class Graph {
    int V;
    vector<vector<pair<int, int>>> adj; // {neighbor, weight}

public:
    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w}); // undirected
    }

    // Heuristic function (you can customize)
    int heuristic(int u, int v) {
        return abs(u - v); // simple estimate (replace with real distance if available)
    }

    void aStar(int start, int goal) {
        priority_queue<pii, vector<pii>, greater<pii>> pq;

        vector<int> g(V, INF); // cost from start
        vector<int> f(V, INF); // total cost (g + h)
        vector<int> parent(V, -1);

        g[start] = 0;
        f[start] = heuristic(start, goal);

        pq.push({f[start], start});

        while (!pq.empty()) {
            int current = pq.top().second;
            pq.pop();

            if (current == goal)
                break;

            for (auto edge : adj[current]) {
                int neighbor = edge.first;
                int weight = edge.second;

                int temp_g = g[current] + weight;

                if (temp_g < g[neighbor]) {
                    parent[neighbor] = current;
                    g[neighbor] = temp_g;
                    f[neighbor] = g[neighbor] + heuristic(neighbor, goal);

                    pq.push({f[neighbor], neighbor});
                }
            }
        }

        // Print path
        cout << "Shortest Path using A*: ";
        int curr = goal;
        vector<int> path;

        while (curr != -1) {
            path.push_back(curr);
            curr = parent[curr];
        }

        reverse(path.begin(), path.end());

        for (int node : path)
            cout << node << " ";

        cout << "\nMinimum Cost: " << g[goal] << endl;
    }
};

int main() {
    int V = 6;
    Graph g(V);

    // Example graph (you can replace with your dataset)
    g.addEdge(0, 1, 4);
    g.addEdge(0, 2, 2);
    g.addEdge(1, 3, 5);
    g.addEdge(2, 3, 8);
    g.addEdge(2, 4, 10);
    g.addEdge(3, 5, 6);
    g.addEdge(4, 5, 3);

    int start = 0, goal = 5;

    g.aStar(start, goal);

    return 0;
}