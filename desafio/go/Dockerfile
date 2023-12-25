############################
# STEP 1 build executable binary
############################
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
# Build the binary.
RUN go build -o /desafio desafio.go

############################
# STEP 2 build a small image
############################
FROM scratch
# Copy our static executable.
COPY --from=builder /desafio /desafio
# Run the binary.
ENTRYPOINT ["/desafio"]