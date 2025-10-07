# Docker Usage Guide

This guide shows how to run the Tip Calculator in Docker containers.

## Quick Start

### Build the image
```bash
docker build -t tip-calculator .
```

## Usage Methods

### 1. Command Line Arguments (Recommended for automation)
```bash
# Run with specific bill and tip percentage
docker run --rm tip-calculator -b 50 -p 15

# Show help
docker run --rm tip-calculator --help
```

### 2. Interactive Mode (For manual input)

**Using Docker directly:**
```bash
# Run interactively - you'll be prompted for input
docker run --rm -it tip-calculator
```

**Using docker-compose:**
```bash
# Default interactive service
docker compose run --rm app

# Or using the interactive profile
docker compose --profile interactive run --rm tip-calculator
```

### 3. Batch Mode with Docker Compose
```bash
# Run with predefined values ($100 bill, 18% tip)
docker compose --profile batch up tip-calculator-batch
```

### 4. Custom Arguments with Docker Compose
```bash
# Run with custom arguments
docker compose run --rm app -b 75 -p 20
```

## Important Notes for Interactive Mode

- **Always use `-it` flags** when running Docker directly for interactive input
- **Use `docker compose run --rm`** instead of `docker compose up` for interactive sessions
- The container needs both `stdin_open: true` and `tty: true` in docker-compose.yaml for proper terminal interaction

## Examples

```bash
# Example 1: Calculate tip for $25 bill with 15% tip
docker run --rm tip-calculator -b 25 -p 15

# Example 2: Interactive mode - you'll be prompted
docker run --rm -it tip-calculator

# Example 3: Using compose for batch processing
docker compose --profile batch up tip-calculator-batch

# Example 4: Using compose interactively
docker compose run --rm app
```

## Troubleshooting

If interactive mode doesn't work properly:
1. Ensure you're using `-it` flags with `docker run`
2. Use `docker compose run` instead of `docker compose up` for interactive sessions
3. Make sure your terminal supports TTY interactions