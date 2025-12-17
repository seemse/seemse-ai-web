# Kubernetes 部署指南

## 📋 前置要求

在开始部署之前，请确保您的系统已安装：

- **Kubernetes 集群**: v1.20.0 或更高版本
- **kubectl**: 已配置集群访问权限
- **Docker**: 用于构建镜像
- **Node.js**: v18.0.0 或更高版本 (用于构建前端)

## 🚀 快速开始

### 1. 构建和推送镜像

```bash
# 构建前端项目
npm install
npm run build

# 构建 Docker 镜像
docker build -t seemse-ai-web:v2.0.0 .

# 标记镜像 (替换为您的仓库地址)
docker tag seemse-ai-web:v2.0.0 your-registry.com/seemse/seemse-ai-web:v2.0.0

# 推送镜像
docker push your-registry.com/seemse/seemse-ai-web:v2.0.0
```

### 2. 基础部署

```bash
# 部署应用
kubectl apply -f deploy.yaml

# 验证部署状态
kubectl get pods -l app=seemse-ai-web
kubectl get services -l app=seemse-ai-web
```

### 3. 配置域名访问 (可选)

如果需要域名访问，部署 Ingress：

```bash
# 部署 Ingress
kubectl apply -f ingress.yaml

# 验证 Ingress 状态
kubectl get ingress seemse-ai-web-ingress
```

## 🔧 配置说明

### deploy.yaml 详解

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: seemse-ai-web
  labels:
    app: seemse-ai-web
spec:
  replicas: 3  # 副本数量，根据需求调整
  selector:
    matchLabels:
      app: seemse-ai-web
  template:
    metadata:
      labels:
        app: seemse-ai-web
    spec:
      containers:
      - name: seemse-ai-web
        image: your-registry.com/seemse/seemse-ai-web:v2.0.0
        ports:
        - containerPort: 80
        env:
        - name: VITE_APP_API_BASE_URL
          value: "http://your-api-service:8080/"
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: seemse-ai-web-service
spec:
  selector:
    app: seemse-ai-web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP
```

### ingress.yaml 配置

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: seemse-ai-web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: seemse-ai-web-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: seemse-ai-web-service
            port:
              number: 80
```

## 📊 扩缩容配置

### 手动扩缩容

```bash
# 扩容到 5 个副本
kubectl scale deployment seemse-ai-web --replicas=5

# 缩容到 2 个副本
kubectl scale deployment seemse-ai-web --replicas=2
```

### 自动扩缩容 (HPA)

```bash
# 创建 HPA
kubectl autoscale deployment seemse-ai-web \
  --cpu-percent=70 \
  --min=2 \
  --max=10

# 查看 HPA 状态
kubectl get hpa
```

### HPA 配置示例

创建 `hpa.yaml`：

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: seemse-ai-web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: seemse-ai-web
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## 🔄 滚动更新

### 更新镜像版本

```bash
# 更新 Deployment 镜像
kubectl set image deployment/seemse-ai-web \
  seemse-ai-web=your-registry.com/seemse/seemse-ai-web:v2.1.0

# 查看更新状态
kubectl rollout status deployment/seemse-ai-web
```

### 回滚版本

```bash
# 查看历史版本
kubectl rollout history deployment/seemse-ai-web

# 回滚到上一个版本
kubectl rollout undo deployment/seemse-ai-web

# 回滚到指定版本
kubectl rollout undo deployment/seemse-ai-web --to-revision=2
```

## 🛠️ 高级配置

### 配置 ConfigMap

创建 `configmap.yaml`：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: seemse-ai-web-config
data:
  VITE_APP_API_BASE_URL: "http://api.xxx.com/"
  VITE_GLOB_API_URL: "/api"
  VITE_GLOB_APP_PWA: "true"
```

在 Deployment 中引用：

```yaml
envFrom:
- configMapRef:
    name: seemse-ai-web-config
```

### 配置 Secret

创建 `secret.yaml`：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: seemse-ai-web-secret
type: Opaque
data:
  api-key: <base64-encoded-api-key>
```

### 持久化存储

如果需要持久化存储：

```yaml
volumeMounts:
- name: seemse-storage
  mountPath: /app/data
volumes:
- name: seemse-storage
  persistentVolumeClaim:
    claimName: seemse-pvc
```

## 🔍 监控与日志

### 查看 Pod 状态

```bash
# 查看所有 Pod
kubectl get pods -l app=seemse-ai-web

# 查看 Pod 详细信息
kubectl describe pod <pod-name>

# 查看 Pod 日志
kubectl logs <pod-name>

# 实时查看日志
kubectl logs -f <pod-name>
```

### 资源监控

```bash
# 查看资源使用情况
kubectl top pods -l app=seemse-ai-web

# 查看节点资源
kubectl top nodes
```

### 事件查看

```bash
# 查看所有事件
kubectl get events --sort-by=.metadata.creationTimestamp

# 查看特定命名空间事件
kubectl get events -n default --sort-by=.metadata.creationTimestamp
```

## 🛡️ 安全配置

### NetworkPolicy 配置

创建 `networkpolicy.yaml`：

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: seemse-ai-web-netpol
spec:
  podSelector:
    matchLabels:
      app: seemse-ai-web
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 80
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: api-service
    ports:
    - protocol: TCP
      port: 8080
```

### PodSecurityPolicy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: seemse-ai-web-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  supplementalGroups:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
  readOnlyRootFilesystem: true
```

## 🐛 故障排查

### Pod 无法启动

```bash
# 查看 Pod 事件
kubectl describe pod <pod-name>

# 检查镜像是否存在
docker pull your-registry.com/seemse/seemse-ai-web:v2.0.0

# 检查资源限制
kubectl describe node <node-name>
```

### 服务无法访问

```bash
# 检查 Service 状态
kubectl get svc seemse-ai-web-service

# 检查 Endpoint
kubectl get endpoints seemse-ai-web-service

# 测试服务连通性
kubectl run test-pod --image=busybox --rm -it -- wget -qO- http://seemse-ai-web-service
```

### Ingress 问题

```bash
# 检查 Ingress Controller
kubectl get pods -n ingress-nginx

# 检查 Ingress 配置
kubectl describe ingress seemse-ai-web-ingress

# 查看 Ingress Controller 日志
kubectl logs -n ingress-nginx <ingress-controller-pod>
```

## 📚 常用命令速查

```bash
# 基础操作
kubectl apply -f <file.yaml>          # 应用配置
kubectl delete -f <file.yaml>         # 删除配置
kubectl get pods                      # 查看 Pod
kubectl get services                  # 查看 Service
kubectl get ingress                   # 查看 Ingress

# 调试命令
kubectl logs <pod-name>               # 查看日志
kubectl describe <resource> <name>   # 查看详细信息
kubectl exec -it <pod-name> -- bash  # 进入容器
kubectl port-forward <pod-name> 8080:80  # 端口转发

# 更新操作
kubectl set image deployment/<name> <container>=<image>  # 更新镜像
kubectl rollout status deployment/<name>                 # 查看更新状态
kubectl rollout undo deployment/<name>                   # 回滚更新
kubectl rollout history deployment/<name>                # 查看历史

# 扩缩容
kubectl scale deployment <name> --replicas=<num>        # 手动扩缩容
kubectl autoscale deployment <name> --min=2 --max=10    # 自动扩缩容
```